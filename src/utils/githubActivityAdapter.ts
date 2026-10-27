import type { ActivityDay } from "@/components/ui/ActivityHeatmap";
import snapshotData from "@/data/farazGithubContributionsSnapshot.json";

export interface GitHubActivityState {
  days: ActivityDay[];
  total: number;
  period: string;
  year: string;
  status: "idle" | "loading" | "success" | "error";
  source: "live" | "cached" | "snapshot";
  lastUpdated: string | null;
  errorMessage: string | null;
  busiestDay: { date: string; count: number } | null;
  activeDaysCount: number;
}

const CACHE_KEY_PREFIX = "fkh_gh_contribs_v1_";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * Normalizes an ISO date string to pure YYYY-MM-DD.
 * Returns null if invalid.
 */
export function sanitizeDateStr(dateStr: unknown): string | null {
  if (typeof dateStr !== "string") return null;
  const trimmed = dateStr.trim();
  const match = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;

  const y = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const d = parseInt(match[3], 10);

  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  const dt = new Date(Date.UTC(y, m - 1, d));
  if (isNaN(dt.getTime())) return null;

  const iso = dt.toISOString().slice(0, 10);
  return iso;
}

/**
 * Generates an array of all continuous YYYY-MM-DD strings between start and end (inclusive)
 * using UTC date operations to avoid timezone drift.
 */
export function generateContinuousDateRange(startIso: string, endIso: string): string[] {
  const dates: string[] = [];
  const start = new Date(`${startIso}T00:00:00Z`).getTime();
  const end = new Date(`${endIso}T00:00:00Z`).getTime();

  if (isNaN(start) || isNaN(end) || start > end) {
    return [startIso];
  }

  const DAY_MS = 86_400_000;
  const count = Math.round((end - start) / DAY_MS) + 1;

  for (let i = 0; i < count; i++) {
    const cur = new Date(start + i * DAY_MS);
    dates.push(cur.toISOString().slice(0, 10));
  }

  return dates;
}

/**
 * Pure data adapter function that transforms raw contribution items into a validated,
 * chronologically sorted, non-gapped ActivityDay[] array.
 */
export function normalizeContributionDays(
  rawDays: Array<{ date: string; count: number }>,
  range?: { start?: string; end?: string }
): ActivityDay[] {
  if (!Array.isArray(rawDays) || rawDays.length === 0) {
    if (range?.start && range?.end) {
      return generateContinuousDateRange(range.start, range.end).map((date) => ({
        date,
        count: 0,
      }));
    }
    return [];
  }

  // 1. Group & sum by valid YYYY-MM-DD
  const countsByDate = new Map<string, number>();
  for (const item of rawDays) {
    const cleanDate = sanitizeDateStr(item.date);
    if (!cleanDate) continue;
    const cleanCount = Math.max(0, Math.floor(Number(item.count) || 0));
    countsByDate.set(cleanDate, (countsByDate.get(cleanDate) || 0) + cleanCount);
  }

  // 2. Determine bounds
  const validDates = Array.from(countsByDate.keys()).sort();
  if (validDates.length === 0) return [];

  const startIso = range?.start ? sanitizeDateStr(range.start) || validDates[0] : validDates[0];
  const endIso = range?.end
    ? sanitizeDateStr(range.end) || validDates[validDates.length - 1]
    : validDates[validDates.length - 1];

  // 3. Fill all calendar days in range with 0 if missing
  const allDays = generateContinuousDateRange(startIso, endIso);

  return allDays.map((date) => ({
    date,
    count: countsByDate.get(date) ?? 0,
  }));
}

/**
 * Computes summary statistics from normalized activity days.
 */
export function computeActivityStats(days: ActivityDay[]) {
  let total = 0;
  let activeDaysCount = 0;
  let busiestDay: { date: string; count: number } | null = null;

  for (const day of days) {
    total += day.count;
    if (day.count > 0) {
      activeDaysCount++;
      if (!busiestDay || day.count > busiestDay.count) {
        busiestDay = { date: day.date, count: day.count };
      }
    }
  }

  return { total, activeDaysCount, busiestDay };
}

/**
 * Loads verified snapshot data from repository bundle.
 */
export function getSnapshotContributions(year: string = "last"): {
  days: ActivityDay[];
  total: number;
  period: string;
} {
  const rawList = (snapshotData as { contributions?: Array<{ date: string; count: number }> })
    .contributions || [];

  let filtered = rawList;
  if (year !== "last" && /^\d{4}$/.test(year)) {
    filtered = rawList.filter((item) => item.date.startsWith(year));
  }

  const days = normalizeContributionDays(filtered);
  const total = days.reduce((sum, d) => sum + d.count, 0);
  const period = year === "last" ? "the last year" : year;

  return { days, total, period };
}

/**
 * Fetches contribution activity for a GitHub user with local cache and snapshot fallback.
 */
export async function fetchGitHubContributions(
  username: string = "farazkayan",
  year: string = "last"
): Promise<{
  days: ActivityDay[];
  total: number;
  period: string;
  source: "live" | "cached" | "snapshot";
  lastUpdated: string;
  error?: string;
}> {
  const cacheKey = `${CACHE_KEY_PREFIX}${username}_${year}`;
  const now = Date.now();

  // 1. Try reading fresh local cache
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const cachedStr = localStorage.getItem(cacheKey);
      if (cachedStr) {
        const cached = JSON.parse(cachedStr);
        if (cached && cached.timestamp && now - cached.timestamp < CACHE_TTL_MS) {
          return {
            days: cached.days,
            total: cached.total,
            period: cached.period,
            source: "cached",
            lastUpdated: new Date(cached.timestamp).toISOString(),
          };
        }
      }
    } catch {
      // Local storage read error or disabled
    }
  }

  // 2. Fetch live from GitHub Contributions API
  const endpoint = `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=${encodeURIComponent(year)}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(endpoint, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to fetch GitHub activity`);
    }

    const json = await response.json();
    const rawContributions = (json.contributions || []) as Array<{
      date: string;
      count: number;
    }>;

    const days = normalizeContributionDays(rawContributions);
    const total = days.reduce((acc, cur) => acc + cur.count, 0);
    const period = year === "last" ? "the last year" : year;
    const lastUpdated = new Date().toISOString();

    // Cache result
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            days,
            total,
            period,
            timestamp: now,
          })
        );
      } catch {
        // storage quota exceeded or disabled
      }
    }

    return {
      days,
      total,
      period,
      source: "live",
      lastUpdated,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Network error";

    // Check for stale cache fallback
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const staleStr = localStorage.getItem(cacheKey);
        if (staleStr) {
          const stale = JSON.parse(staleStr);
          return {
            days: stale.days,
            total: stale.total,
            period: stale.period,
            source: "cached",
            lastUpdated: new Date(stale.timestamp).toISOString(),
            error: `${errorMsg} (using cached data)`,
          };
        }
      } catch {
        // ignore
      }
    }

    // Fallback to verified local repository snapshot
    const snapshot = getSnapshotContributions(year);
    return {
      days: snapshot.days,
      total: snapshot.total,
      period: snapshot.period,
      source: "snapshot",
      lastUpdated: "2026-10-27T16:00:00Z",
      error: `${errorMsg} (showing verified GitHub snapshot)`,
    };
  }
}
