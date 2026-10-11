import { CheckCheck, Clock, TrendingDown, TrendingUp, Zap } from 'lucide-react';
import type { ActionRecommendation } from '../types';
import { useAppStore } from '../store';

function RecCard({ rec }: { rec: ActionRecommendation }) {
  const { updateRecommendation } = useAppStore();
  const isBuyYes = rec.action === 'BUY_YES';
  const edgePct = Math.round(Math.abs(rec.edge) * 100);

  const statusBg: Record<string, string> = {
    pending: '',
    acted: 'opacity-60',
    dismissed: 'opacity-40',
  };

  return (
    <div className={`bg-slate-900 border rounded-xl p-5 transition-opacity ${
      isBuyYes ? 'border-emerald-500/30' : 'border-rose-500/30'
    } ${statusBg[rec.status]}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold ${
              isBuyYes
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
            }`}
          >
            {isBuyYes ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {rec.action.replace('_', ' ')}
          </div>
          <div>
            <p className="text-slate-200 font-medium text-sm">{rec.marketTitle}</p>
            <p className="text-slate-600 text-xs font-mono mt-0.5">{rec.ticker}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {rec.status === 'pending' && (
            <>
              <button
                onClick={() => updateRecommendation(rec.id, 'acted')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-md transition-colors"
              >
                <CheckCheck size={12} />
                Mark Acted
              </button>
              <button
                onClick={() => updateRecommendation(rec.id, 'dismissed')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-medium rounded-md transition-colors"
              >
                Dismiss
              </button>
            </>
          )}
          {rec.status === 'acted' && (
            <span className="text-xs text-emerald-500 font-medium">Acted on</span>
          )}
          {rec.status === 'dismissed' && (
            <span className="text-xs text-slate-600 font-medium">Dismissed</span>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-6 text-xs">
        <span className="text-slate-500">
          Market: <span className="font-mono text-slate-300">{(rec.marketPrice * 100).toFixed(0)}%</span>
        </span>
        <span className="text-slate-500">
          AI Prob: <span className="font-mono text-indigo-400">{(rec.aiProbability * 100).toFixed(0)}%</span>
        </span>
        <span className={`font-semibold ${isBuyYes ? 'text-emerald-400' : 'text-rose-400'}`}>
          Edge: {rec.edge > 0 ? '+' : ''}{edgePct}%
        </span>
        <span
          className={`capitalize ${
            rec.confidence === 'high'
              ? 'text-emerald-500'
              : rec.confidence === 'medium'
              ? 'text-amber-500'
              : 'text-slate-500'
          }`}
        >
          {rec.confidence} confidence
        </span>
        <span className="text-slate-600 flex items-center gap-1 ml-auto">
          <Clock size={10} />
          {new Date(rec.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="mt-3 text-xs text-slate-400 leading-relaxed line-clamp-3 border-t border-slate-800 pt-3">
        {rec.reasoning}
      </div>
    </div>
  );
}

export function ActionQueue() {
  const { recommendations, setActiveTab } = useAppStore();
  const pending = recommendations.filter((r) => r.status === 'pending');
  const resolved = recommendations.filter((r) => r.status !== 'pending');

  return (
    <div className="px-8 py-7">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-100">Action Queue</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            AI-flagged trade opportunities with edge &gt; 10%
          </p>
        </div>
        {pending.length > 0 && (
          <span className="bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
            {pending.length} pending
          </span>
        )}
      </div>

      {recommendations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-600">
          <Zap size={32} />
          <p className="mt-4 text-sm">No recommendations yet.</p>
          <p className="text-xs mt-1">
            Run pipelines in{' '}
            <button
              onClick={() => setActiveTab('pipeline')}
              className="text-indigo-400 hover:underline"
            >
              Pipeline Manager
            </button>{' '}
            to generate recommendations.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {pending.length > 0 && (
            <section>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-3">
                Pending Review
              </p>
              <div className="space-y-3">
                {pending.map((r) => (
                  <RecCard key={r.id} rec={r} />
                ))}
              </div>
            </section>
          )}
          {resolved.length > 0 && (
            <section>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-3">
                Resolved
              </p>
              <div className="space-y-3">
                {resolved.map((r) => (
                  <RecCard key={r.id} rec={r} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
