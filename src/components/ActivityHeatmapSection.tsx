import React, { useState, useEffect, useTransition } from 'react';
import { ActivityHeatmap } from '@/components/ui/ActivityHeatmap';
import {
  fetchGitHubContributions,
  GitHubActivityState,
} from '@/utils/githubActivityAdapter';

interface ActivityHeatmapSectionProps {
  className?: string;
}

export const ActivityHeatmapSection: React.FC<ActivityHeatmapSectionProps> = ({
  className = '',
}) => {
  const [yearOption, setYearOption] = useState<'last' | '2026'>('last');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const [state, setState] = useState<GitHubActivityState>({
    days: [],
    total: 0,
    period: 'the last year',
    year: 'last',
    status: 'loading',
    source: 'snapshot',
    lastUpdated: null,
    errorMessage: null,
    busiestDay: null,
    activeDaysCount: 0,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setState((prev) => ({ ...prev, status: 'loading' }));

      const res = await fetchGitHubContributions('farazkayan', yearOption);
      if (!isMounted) return;

      startTransition(() => {
        setState({
          days: res.days,
          total: res.total,
          period: res.period,
          year: yearOption,
          status: 'success',
          source: res.source,
          lastUpdated: res.lastUpdated,
          errorMessage: res.error || null,
          busiestDay: null,
          activeDaysCount: 0,
        });
      });
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [yearOption]);

  return (
    <div
      className={`rounded-2xl bg-[#0c0c0e]/70 border border-zinc-800/70 p-5 sm:p-7 hover:border-purple-500/30 transition-all duration-200 shadow-sm ${className}`}
    >
      <ActivityHeatmap
        days={state.days}
        label={`Contributions in ${state.period}`}
        period={state.period}
        unit={{ one: 'contribution', other: 'contributions' }}
        selectedDate={selectedDate}
        onSelectDate={(date) => {
          setSelectedDate((curr) => (curr === date ? null : date));
        }}
        actions={
          <div className="inline-flex items-center rounded-lg bg-zinc-900/90 p-0.5 border border-zinc-800 text-xs font-mono">
            <button
              type="button"
              onClick={() => setYearOption('last')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                yearOption === 'last'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Last 12 Mo
            </button>
            <button
              type="button"
              onClick={() => setYearOption('2026')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                yearOption === '2026'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              2026
            </button>
          </div>
        }
      />
    </div>
  );
};

export default ActivityHeatmapSection;
