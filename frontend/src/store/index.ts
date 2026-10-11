import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateMockJudge, generateMockRedTeam, generateMockResearch } from '../mockData/generators';
import { PRESET_MARKETS } from '../mockData/presets';
import type { ActionRecommendation, Market, PipelineRun, RecommendationStatus, TabName } from '../types';

interface AppState {
  activeTab: TabName;
  markets: Market[];
  pipelines: Record<string, PipelineRun>;
  recommendations: ActionRecommendation[];
  auditMarketId: string | null;

  setActiveTab: (tab: TabName) => void;
  addMarket: (market: Market) => void;
  updateMarket: (id: string, updates: Partial<Market>) => void;
  deleteMarket: (id: string) => void;
  runPipeline: (marketId: string) => void;
  openAudit: (marketId: string) => void;
  closeAudit: () => void;
  updateRecommendation: (id: string, status: RecommendationStatus) => void;
  loadPresets: () => void;
  clearAll: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      activeTab: 'markets',
      markets: [],
      pipelines: {},
      recommendations: [],
      auditMarketId: null,

      setActiveTab: (tab) => set({ activeTab: tab }),

      addMarket: (market) =>
        set((state) => ({ markets: [market, ...state.markets] })),

      updateMarket: (id, updates) =>
        set((state) => ({
          markets: state.markets.map((m) => (m.id === id ? { ...m, ...updates } : m)),
        })),

      deleteMarket: (id) =>
        set((state) => {
          const pipelines = { ...state.pipelines };
          delete pipelines[id];
          return {
            markets: state.markets.filter((m) => m.id !== id),
            pipelines,
            recommendations: state.recommendations.filter((r) => r.marketId !== id),
          };
        }),

      runPipeline: (marketId) => {
        const market = get().markets.find((m) => m.id === marketId);
        if (!market) return;

        const startedAt = new Date().toISOString();

        set((state) => ({
          markets: state.markets.map((m) =>
            m.id === marketId ? { ...m, pipelineStatus: 'researching' } : m,
          ),
          pipelines: {
            ...state.pipelines,
            [marketId]: {
              marketId,
              status: 'researching',
              startedAt,
              completedAt: null,
              research: null,
              redTeam: null,
              judge: null,
            },
          },
        }));

        setTimeout(() => {
          const research = generateMockResearch(market);
          set((state) => ({
            markets: state.markets.map((m) =>
              m.id === marketId ? { ...m, pipelineStatus: 'red-teaming' } : m,
            ),
            pipelines: {
              ...state.pipelines,
              [marketId]: { ...state.pipelines[marketId], status: 'red-teaming', research },
            },
          }));
        }, 2800);

        setTimeout(() => {
          const redTeam = generateMockRedTeam(market);
          set((state) => ({
            markets: state.markets.map((m) =>
              m.id === marketId ? { ...m, pipelineStatus: 'judging' } : m,
            ),
            pipelines: {
              ...state.pipelines,
              [marketId]: { ...state.pipelines[marketId], status: 'judging', redTeam },
            },
          }));
        }, 5600);

        setTimeout(() => {
          const judge = generateMockJudge(market);
          const aiProbability = judge.probability;
          const edge = Math.round((aiProbability - market.marketPrice) * 100) / 100;
          const completedAt = new Date().toISOString();

          set((state) => ({
            markets: state.markets.map((m) =>
              m.id === marketId
                ? { ...m, pipelineStatus: 'complete', aiProbability, edge }
                : m,
            ),
            pipelines: {
              ...state.pipelines,
              [marketId]: { ...state.pipelines[marketId], status: 'complete', judge, completedAt },
            },
          }));

          if (Math.abs(edge) >= 0.10) {
            const rec: ActionRecommendation = {
              id: crypto.randomUUID(),
              marketId,
              marketTitle: market.title,
              ticker: market.ticker,
              action: edge > 0 ? 'BUY_YES' : 'BUY_NO',
              aiProbability,
              marketPrice: market.marketPrice,
              edge,
              confidence: judge.confidence,
              reasoning: judge.reasoning,
              status: 'pending',
              createdAt: completedAt,
            };
            set((state) => ({
              recommendations: [rec, ...state.recommendations],
            }));
          }
        }, 8400);
      },

      openAudit: (marketId) => set({ auditMarketId: marketId }),
      closeAudit: () => set({ auditMarketId: null }),

      updateRecommendation: (id, status) =>
        set((state) => ({
          recommendations: state.recommendations.map((r) =>
            r.id === id ? { ...r, status } : r,
          ),
        })),

      loadPresets: () => {
        const { markets } = get();
        const existingIds = new Set(markets.map((m) => m.id));
        const newPresets = PRESET_MARKETS.filter((p) => !existingIds.has(p.id));
        set((state) => ({ markets: [...newPresets, ...state.markets] }));
      },

      clearAll: () =>
        set({ markets: [], pipelines: {}, recommendations: [], auditMarketId: null }),
    }),
    { name: 'predictions-market-store' },
  ),
);
