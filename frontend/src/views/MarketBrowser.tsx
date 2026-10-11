import { Clock, TrendingDown, TrendingUp } from 'lucide-react';
import type { Category, Market } from '../types';
import { useAppStore } from '../store';

const CATEGORY_COLORS: Record<Category, string> = {
  Politics: 'bg-violet-500/15 text-violet-400 border border-violet-500/25',
  Sports: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
  Economics: 'bg-blue-500/15 text-blue-400 border border-blue-500/25',
  Tech: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25',
  Other: 'bg-slate-500/15 text-slate-400 border border-slate-500/25',
};

function EdgeBadge({ edge }: { edge: number | null }) {
  if (edge === null) return <span className="text-slate-600 text-sm">—</span>;
  const pct = Math.round(edge * 100);
  const positive = edge > 0;
  const strong = Math.abs(edge) >= 0.10;

  if (strong) {
    return (
      <span
        className={`inline-flex items-center gap-1 text-sm font-semibold ${
          positive ? 'text-emerald-400' : 'text-rose-400'
        }`}
      >
        {positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        {positive ? '+' : ''}{pct}%
      </span>
    );
  }
  return (
    <span className={`text-sm ${positive ? 'text-emerald-500/70' : 'text-rose-500/70'}`}>
      {positive ? '+' : ''}{pct}%
    </span>
  );
}

function PipelineDot({ status }: { status: Market['pipelineStatus'] }) {
  const map: Record<string, string> = {
    idle: 'bg-slate-600',
    researching: 'bg-blue-400 animate-pulse',
    'red-teaming': 'bg-amber-400 animate-pulse',
    judging: 'bg-violet-400 animate-pulse',
    complete: 'bg-emerald-500',
    error: 'bg-rose-500',
  };
  return (
    <span className="flex items-center gap-1.5 text-xs text-slate-400 capitalize">
      <span className={`w-2 h-2 rounded-full ${map[status] ?? 'bg-slate-600'}`} />
      {status === 'idle' ? 'not run' : status}
    </span>
  );
}

const CATEGORIES: (Category | 'All')[] = ['All', 'Politics', 'Economics', 'Sports', 'Tech', 'Other'];

export function MarketBrowser() {
  const { markets, setActiveTab } = useAppStore();
  const [filter, setFilter] = React.useState<Category | 'All'>('All');

  const filtered = filter === 'All' ? markets : markets.filter((m) => m.category === filter);

  return (
    <div className="px-8 py-7">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-100">Market Browser</h1>
          <p className="text-sm text-slate-500 mt-0.5">{markets.length} markets tracked</p>
        </div>

        {markets.length === 0 && (
          <button
            onClick={() => setActiveTab('settings')}
            className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md transition-colors"
          >
            Load mock data
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              filter === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-600">
          <BarChart2Icon />
          <p className="mt-4 text-sm">No markets yet.</p>
          <p className="text-xs mt-1">
            Go to{' '}
            <button
              onClick={() => setActiveTab('settings')}
              className="text-indigo-400 hover:underline"
            >
              Settings
            </button>{' '}
            to load preset markets.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-left">
                <th className="pb-3 text-xs text-slate-500 font-medium">Market</th>
                <th className="pb-3 text-xs text-slate-500 font-medium px-4">Category</th>
                <th className="pb-3 text-xs text-slate-500 font-medium px-4 text-right">Market</th>
                <th className="pb-3 text-xs text-slate-500 font-medium px-4 text-right">AI Prob</th>
                <th className="pb-3 text-xs text-slate-500 font-medium px-4 text-right">Edge</th>
                <th className="pb-3 text-xs text-slate-500 font-medium px-4">Pipeline</th>
                <th className="pb-3 text-xs text-slate-500 font-medium px-4">Closes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 pr-4">
                    <div>
                      <p className="text-slate-200 font-medium leading-snug">{m.title}</p>
                      <p className="text-slate-600 text-xs mt-0.5 font-mono">{m.ticker}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${CATEGORY_COLORS[m.category]}`}>
                      {m.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                    {(m.marketPrice * 100).toFixed(0)}%
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                    {m.aiProbability !== null ? `${(m.aiProbability * 100).toFixed(0)}%` : '—'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <EdgeBadge edge={m.edge} />
                  </td>
                  <td className="py-3.5 px-4">
                    <PipelineDot status={m.pipelineStatus} />
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 text-xs">
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {m.closesAt}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

import React from 'react';
import { BarChart2 as BarChart2Icon } from 'lucide-react';
