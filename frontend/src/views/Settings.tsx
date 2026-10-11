import React, { useState } from 'react';
import { AlertTriangle, Database, Layers, Plus, Trash2 } from 'lucide-react';
import type { Category, Market } from '../types';
import { useAppStore } from '../store';

const CATEGORIES: Category[] = ['Politics', 'Sports', 'Economics', 'Tech', 'Other'];

const EMPTY_FORM = {
  title: '',
  ticker: '',
  category: 'Politics' as Category,
  marketPrice: 50,
  closesAt: '',
  rules: '',
};

export function Settings() {
  const { markets, addMarket, deleteMarket, loadPresets, clearAll } = useAppStore();
  const [form, setForm] = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const market: Market = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      ticker: form.ticker.trim().toUpperCase(),
      category: form.category,
      marketPrice: form.marketPrice / 100,
      aiProbability: null,
      edge: null,
      pipelineStatus: 'idle',
      closesAt: form.closesAt,
      rules: form.rules.trim(),
      createdAt: new Date().toISOString(),
    };
    addMarket(market);
    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  return (
    <div className="px-8 py-7 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-slate-100">Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage mock data and market configuration</p>
      </div>

      {/* Preset loader */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Layers size={16} className="text-indigo-400" />
          <h2 className="text-sm font-semibold text-slate-300">Preset Markets</h2>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Load 6 pre-configured markets spanning Politics, Economics, Sports, and Tech with realistic
          market prices and mock pipeline outputs ready to simulate.
        </p>
        <button
          onClick={loadPresets}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-md font-medium transition-colors"
        >
          Load Preset Markets
        </button>
      </section>

      <hr className="border-slate-800 mb-8" />

      {/* Add market */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Plus size={16} className="text-slate-400" />
            <h2 className="text-sm font-semibold text-slate-300">Add Custom Market</h2>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              + Add
            </button>
          )}
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs text-slate-500 mb-1.5">Title *</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Will X happen by Y date?"
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Ticker *</label>
                <input
                  required
                  value={form.ticker}
                  onChange={(e) => setForm((f) => ({ ...f, ticker: e.target.value }))}
                  placeholder="EVENT-TICKER-2026"
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Category }))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">
                  Market Price: <span className="text-indigo-400 font-mono">{form.marketPrice}%</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="99"
                  value={form.marketPrice}
                  onChange={(e) => setForm((f) => ({ ...f, marketPrice: Number(e.target.value) }))}
                  className="w-full accent-indigo-500"
                />
                <div className="flex justify-between text-xs text-slate-600 mt-1">
                  <span>1%</span><span>99%</span>
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Closes At</label>
                <input
                  type="date"
                  value={form.closesAt}
                  onChange={(e) => setForm((f) => ({ ...f, closesAt: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-slate-500 mb-1.5">Resolution Rules</label>
                <textarea
                  value={form.rules}
                  onChange={(e) => setForm((f) => ({ ...f, rules: e.target.value }))}
                  rows={2}
                  placeholder="Resolves YES if..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-md font-medium transition-colors"
              >
                Add Market
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setForm(EMPTY_FORM); }}
                className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </section>

      <hr className="border-slate-800 mb-8" />

      {/* Current markets list */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Database size={16} className="text-slate-400" />
          <h2 className="text-sm font-semibold text-slate-300">
            Current Markets ({markets.length})
          </h2>
        </div>

        {markets.length === 0 ? (
          <p className="text-xs text-slate-600">No markets added yet.</p>
        ) : (
          <div className="space-y-2">
            {markets.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg px-4 py-3"
              >
                <div>
                  <p className="text-sm text-slate-300 font-medium">{m.title}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-slate-600 font-mono">{m.ticker}</span>
                    <span className="text-xs text-slate-600">{m.category}</span>
                    <span className="text-xs text-slate-600">
                      Market: {(m.marketPrice * 100).toFixed(0)}%
                    </span>
                    <span className={`text-xs capitalize ${
                      m.pipelineStatus === 'complete' ? 'text-emerald-500' :
                      m.pipelineStatus === 'idle' ? 'text-slate-600' : 'text-amber-500'
                    }`}>
                      {m.pipelineStatus}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteMarket(m.id)}
                  className="text-slate-600 hover:text-rose-400 transition-colors p-1"
                  title="Delete market"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <hr className="border-slate-800 mb-8" />

      {/* Danger zone */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={16} className="text-rose-400" />
          <h2 className="text-sm font-semibold text-rose-400">Danger Zone</h2>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Clears all markets, pipeline runs, and recommendations from local storage.
        </p>
        {!confirmClear ? (
          <button
            onClick={() => setConfirmClear(true)}
            className="border border-rose-500/40 text-rose-400 hover:bg-rose-500/10 text-sm px-4 py-2 rounded-md font-medium transition-colors"
          >
            Clear All Data
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <p className="text-xs text-rose-400">Are you sure? This cannot be undone.</p>
            <button
              onClick={() => { clearAll(); setConfirmClear(false); }}
              className="bg-rose-600 hover:bg-rose-500 text-white text-xs px-3 py-1.5 rounded-md font-medium transition-colors"
            >
              Yes, clear all
            </button>
            <button
              onClick={() => setConfirmClear(false)}
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
