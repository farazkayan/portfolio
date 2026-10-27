import test from "node:test";
import assert from "node:assert/strict";
import {
  sanitizeDateStr,
  generateContinuousDateRange,
  normalizeContributionDays,
  computeActivityStats,
  getSnapshotContributions,
} from "./githubActivityAdapter";

test("sanitizeDateStr accepts valid YYYY-MM-DD", () => {
  assert.equal(sanitizeDateStr("2026-10-27"), "2026-10-27");
  assert.equal(sanitizeDateStr("2026-02-28"), "2026-02-28");
  assert.equal(sanitizeDateStr("2026-01-01T15:30:00Z"), "2026-01-01");
});

test("sanitizeDateStr rejects invalid dates", () => {
  assert.equal(sanitizeDateStr("not-a-date"), null);
  assert.equal(sanitizeDateStr("2026-13-45"), null);
  assert.equal(sanitizeDateStr(""), null);
  assert.equal(sanitizeDateStr(null), null);
  assert.equal(sanitizeDateStr(12345), null);
});

test("generateContinuousDateRange generates sequential UTC dates without gaps", () => {
  const range = generateContinuousDateRange("2026-10-25", "2026-10-28");
  assert.deepEqual(range, [
    "2026-10-25",
    "2026-10-26",
    "2026-10-27",
    "2026-10-28",
  ]);
});

test("generateContinuousDateRange handles month and year boundary correctly", () => {
  const range = generateContinuousDateRange("2025-12-30", "2026-01-02");
  assert.deepEqual(range, [
    "2025-12-30",
    "2025-12-31",
    "2026-01-01",
    "2026-01-02",
  ]);
});

test("normalizeContributionDays fills missing dates in range with zero", () => {
  const raw = [
    { date: "2026-10-01", count: 4 },
    { date: "2026-10-04", count: 2 },
  ];

  const result = normalizeContributionDays(raw, {
    start: "2026-10-01",
    end: "2026-10-04",
  });

  assert.equal(result.length, 4);
  assert.deepEqual(result[0], { date: "2026-10-01", count: 4 });
  assert.deepEqual(result[1], { date: "2026-10-02", count: 0 });
  assert.deepEqual(result[2], { date: "2026-10-03", count: 0 });
  assert.deepEqual(result[3], { date: "2026-10-04", count: 2 });
});

test("normalizeContributionDays sums duplicate records for the same day", () => {
  const raw = [
    { date: "2026-10-21", count: 3 },
    { date: "2026-10-21", count: 4 },
  ];

  const result = normalizeContributionDays(raw);
  assert.equal(result.length, 1);
  assert.deepEqual(result[0], { date: "2026-10-21", count: 7 });
});

test("normalizeContributionDays clamps negative or invalid counts to zero", () => {
  const raw = [
    { date: "2026-10-21", count: -5 },
    { date: "2026-10-22", count: NaN },
  ];

  const result = normalizeContributionDays(raw);
  assert.equal(result.find((d) => d.date === "2026-10-21")?.count, 0);
  assert.equal(result.find((d) => d.date === "2026-10-22")?.count, 0);
});

test("computeActivityStats calculates total, active days, and peak day", () => {
  const days = [
    { date: "2026-10-25", count: 0 },
    { date: "2026-10-26", count: 5 },
    { date: "2026-10-27", count: 12 },
    { date: "2026-10-28", count: 3 },
  ];

  const stats = computeActivityStats(days);
  assert.equal(stats.total, 20);
  assert.equal(stats.activeDaysCount, 3);
  assert.deepEqual(stats.busiestDay, { date: "2026-10-27", count: 12 });
});

test("getSnapshotContributions returns valid non-empty snapshot data", () => {
  const snapshot = getSnapshotContributions("last");
  assert.ok(snapshot.days.length > 300);
  assert.ok(snapshot.total > 0);
  assert.equal(snapshot.period, "the last year");
});
