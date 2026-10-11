import { Activity, BarChart2, Settings, Zap } from 'lucide-react';
import type { TabName } from '../types';
import { useAppStore } from '../store';

const NAV_ITEMS: { id: TabName; label: string; icon: React.ReactNode }[] = [
  { id: 'markets', label: 'Markets', icon: <BarChart2 size={18} /> },
  { id: 'pipeline', label: 'Pipeline', icon: <Activity size={18} /> },
  { id: 'queue', label: 'Action Queue', icon: <Zap size={18} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { activeTab, setActiveTab, recommendations } = useAppStore();
  const pendingCount = recommendations.filter((r) => r.status === 'pending').length;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 flex flex-col bg-slate-900 border-r border-slate-800">
        <div className="px-5 py-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center">
              <BarChart2 size={14} className="text-white" />
            </div>
            <span className="text-sm font-semibold tracking-wide text-slate-100">
              ForecastIQ
            </span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-400 font-medium'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.id === 'queue' && pendingCount > 0 && (
                  <span className="ml-auto bg-amber-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {pendingCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="px-5 py-4 border-t border-slate-800">
          <p className="text-xs text-slate-600">SQLite · Local mode</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
