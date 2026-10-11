import React from 'react';
import { Activity, CheckCircle2, ChevronRight, Loader2, Play } from 'lucide-react';
import type { Market, PipelineStatus } from '../types';
import { useAppStore } from '../store';

const STEP_ORDER: PipelineStatus[] = ['researching', 'red-teaming', 'judging', 'complete'];

const STEP_LABELS: Partial<Record<PipelineStatus, string>> = {
  researching: 'Research Agent',
  'red-teaming': 'Red-Team Agent',
  judging: 'Forecasting Judge',
  complete: 'Complete',
};

function StepBadge({ step, currentStatus }: { step: PipelineStatus; currentStatus: PipelineStatus }) {
  const stepIdx = STEP_ORDER.indexOf(step);
  const currentIdx = STEP_ORDER.indexOf(currentStatus);

  if (currentStatus === 'idle' || currentIdx < stepIdx) {
    return (
      <span className="flex items-center gap-1.5 text-xs text-slate-600">
        <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px]">
          {stepIdx + 1}
        </span>
        {STEP_LABELS[step]}
      </span>
    );
  }
  if (stepIdx < currentIdx || (step === 'complete' && currentStatus === 'complete')) {
    return (
      <span className="flex items-center gap-1.5 text-xs text-emerald-400">
        <CheckCircle2 size={16} />
        {STEP_LABELS[step]}
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 text-xs text-indigo-400 font-medium">
      <Loader2 size={14} className="animate-spin" />
      {STEP_LABELS[step]}
    </span>
  );
}

function PipelineCard({ market }: { market: Market }) {
  const { runPipeline, openAudit, setActiveTab } = useAppStore();
  const running = ['researching', 'red-teaming', 'judging'].includes(market.pipelineStatus);

  function handleAudit() {
    openAudit(market.id);
    setActiveTab('pipeline');
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-slate-200 font-medium text-sm leading-snug">{market.title}</p>
          <p className="text-slate-600 text-xs mt-0.5 font-mono">{market.ticker}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {market.pipelineStatus === 'complete' && (
            <button
              onClick={handleAudit}
              className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Audit <ChevronRight size={12} />
            </button>
          )}
          <button
            onClick={() => runPipeline(market.id)}
            disabled={running}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              running
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {running ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <Play size={11} />
            )}
            {running ? 'Running...' : market.pipelineStatus === 'complete' ? 'Re-run' : 'Run Pipeline'}
          </button>
        </div>
      </div>

      {/* Progress steps */}
      <div className="flex items-center gap-3 flex-wrap">
        {(['researching', 'red-teaming', 'judging', 'complete'] as PipelineStatus[]).map((step, i) => (
          <React.Fragment key={step}>
            <StepBadge step={step} currentStatus={market.pipelineStatus} />
            {i < 3 && (
              <ChevronRight
                size={12}
                className={
                  STEP_ORDER.indexOf(market.pipelineStatus) > i ? 'text-slate-500' : 'text-slate-700'
                }
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Result row */}
      {market.pipelineStatus === 'complete' && market.aiProbability !== null && (
        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-6 text-xs">
          <span className="text-slate-500">
            Market: <span className="text-slate-300 font-mono">{(market.marketPrice * 100).toFixed(0)}%</span>
          </span>
          <span className="text-slate-500">
            AI Prob: <span className="text-slate-300 font-mono">{(market.aiProbability * 100).toFixed(0)}%</span>
          </span>
          {market.edge !== null && (
            <span
              className={`font-semibold ${
                Math.abs(market.edge) >= 0.10
                  ? market.edge > 0
                    ? 'text-emerald-400'
                    : 'text-rose-400'
                  : 'text-slate-400'
              }`}
            >
              Edge: {market.edge > 0 ? '+' : ''}{(market.edge * 100).toFixed(0)}%
              {Math.abs(market.edge) >= 0.10 && ' ★'}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function PipelineManager() {
  const { markets, auditMarketId, pipelines, closeAudit, setActiveTab } = useAppStore();
  const auditMarket = auditMarketId ? markets.find((m) => m.id === auditMarketId) : null;
  const auditPipeline = auditMarketId ? pipelines[auditMarketId] : null;

  if (auditMarket && auditPipeline) {
    return <AuditDetail market={auditMarket} pipeline={auditPipeline} onBack={closeAudit} />;
  }

  return (
    <div className="px-8 py-7">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-100">Pipeline Manager</h1>
          <p className="text-sm text-slate-500 mt-0.5">Run and monitor agent pipelines per market</p>
        </div>
      </div>

      {markets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-600">
          <Activity size={32} />
          <p className="mt-4 text-sm">No markets to run.</p>
          <p className="text-xs mt-1">
            <button
              onClick={() => setActiveTab('settings')}
              className="text-indigo-400 hover:underline"
            >
              Load preset markets
            </button>{' '}
            to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {markets.map((m) => (
            <PipelineCard key={m.id} market={m} />
          ))}
        </div>
      )}
    </div>
  );
}

import type { PipelineRun } from '../types';

function AuditDetail({
  market,
  pipeline,
  onBack,
}: {
  market: Market;
  pipeline: PipelineRun;
  onBack: () => void;
}) {
  const [tab, setTab] = React.useState<'research' | 'redteam' | 'judge'>('research');

  return (
    <div className="px-8 py-7">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 mb-5 transition-colors"
      >
        ← Back to Pipeline
      </button>

      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-100">{market.title}</h1>
        <p className="text-slate-500 text-xs mt-1 font-mono">{market.ticker}</p>
      </div>

      {/* Summary strip */}
      {pipeline.judge && (
        <div className="flex items-center gap-8 bg-slate-900 border border-slate-800 rounded-xl px-6 py-4 mb-6 text-sm">
          <div>
            <p className="text-slate-500 text-xs mb-1">Market Price</p>
            <p className="font-mono text-slate-200 text-lg">{(market.marketPrice * 100).toFixed(0)}%</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs mb-1">AI Probability</p>
            <p className="font-mono text-indigo-400 text-lg font-semibold">
              {(pipeline.judge.probability * 100).toFixed(0)}%
            </p>
          </div>
          <div>
            <p className="text-slate-500 text-xs mb-1">Edge</p>
            <p
              className={`font-mono text-lg font-semibold ${
                market.edge !== null && market.edge > 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {market.edge !== null
                ? `${market.edge > 0 ? '+' : ''}${(market.edge * 100).toFixed(0)}%`
                : '—'}
            </p>
          </div>
          <div>
            <p className="text-slate-500 text-xs mb-1">Confidence</p>
            <p
              className={`capitalize font-medium text-sm ${
                pipeline.judge.confidence === 'high'
                  ? 'text-emerald-400'
                  : pipeline.judge.confidence === 'medium'
                  ? 'text-amber-400'
                  : 'text-slate-400'
              }`}
            >
              {pipeline.judge.confidence}
            </p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-slate-900 border border-slate-800 rounded-lg p-1 w-fit">
        {(['research', 'redteam', 'judge'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${
              tab === t ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t === 'research' ? 'Research' : t === 'redteam' ? 'Red-Team' : 'Judge'}
          </button>
        ))}
      </div>

      {tab === 'research' && pipeline.research && (
        <ResearchTab research={pipeline.research} />
      )}
      {tab === 'redteam' && pipeline.redTeam && (
        <RedTeamTab redTeam={pipeline.redTeam} />
      )}
      {tab === 'judge' && pipeline.judge && (
        <JudgeTab judge={pipeline.judge} />
      )}
    </div>
  );
}

import type { JudgeOutput, RedTeamOutput, ResearchOutput } from '../types';

function ResearchTab({ research }: { research: ResearchOutput }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-5">
          <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-3">Bull Case</p>
          <p className="text-slate-300 text-sm leading-relaxed">{research.bullCase}</p>
        </div>
        <div className="bg-slate-900 border border-rose-500/20 rounded-xl p-5">
          <p className="text-xs text-rose-400 font-semibold uppercase tracking-wider mb-3">Bear Case</p>
          <p className="text-slate-300 text-sm leading-relaxed">{research.bearCase}</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3">Summary</p>
        <p className="text-slate-300 text-sm leading-relaxed">{research.summary}</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-4">
          Sources ({research.articles.length})
        </p>
        <div className="space-y-3">
          {research.articles.map((article, i) => (
            <div key={i} className="flex items-start gap-3 pb-3 border-b border-slate-800 last:border-0 last:pb-0">
              <span className="text-xs text-slate-600 mt-0.5 w-5 shrink-0">{i + 1}.</span>
              <div>
                <p className="text-sm text-indigo-400">{article.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{article.snippet}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-xs text-slate-600">{article.publishedAt}</span>
                  <span className="text-xs text-slate-600">
                    Relevance: {(article.relevanceScore * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RedTeamTab({ redTeam }: { redTeam: RedTeamOutput }) {
  const severityColors = { low: 'text-slate-400', medium: 'text-amber-400', high: 'text-rose-400' };

  return (
    <div className="space-y-5">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-4">Critiques</p>
        <div className="space-y-3">
          {redTeam.critiques.map((c, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className={`text-xs font-semibold capitalize shrink-0 mt-0.5 w-14 ${severityColors[c.severity]}`}>
                {c.severity}
              </span>
              <p className="text-sm text-slate-300 leading-relaxed">{c.point}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-amber-500/20 rounded-xl p-5">
          <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-3">Bias Flags</p>
          <ul className="space-y-2">
            {redTeam.biasFlags.map((b, i) => (
              <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">⚠</span> {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3">Alt. Interpretations</p>
          <ul className="space-y-2">
            {redTeam.alternativeInterpretations.map((a, i) => (
              <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                <span className="text-slate-500 mt-0.5">↪</span> {a}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3">Overall Assessment</p>
        <p className="text-slate-300 text-sm leading-relaxed">{redTeam.overallAssessment}</p>
      </div>
    </div>
  );
}

function JudgeTab({ judge }: { judge: JudgeOutput }) {
  return (
    <div className="space-y-5">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3">Reasoning</p>
        <p className="text-slate-300 text-sm leading-relaxed">{judge.reasoning}</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3">Calibration Notes</p>
        <p className="text-slate-300 text-sm leading-relaxed">{judge.calibrationNotes}</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-4">Key Factors</p>
        <ul className="space-y-2">
          {judge.keyFactors.map((f, i) => (
            <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
              <span className="text-indigo-400 mt-0.5 shrink-0">#{i + 1}</span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
