import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/Layout';
import { useAppStore } from './store';
import { ActionQueue } from './views/ActionQueue';
import { MarketBrowser } from './views/MarketBrowser';
import { PipelineManager } from './views/PipelineManager';
import { Settings } from './views/Settings';

const queryClient = new QueryClient();

function AppContent() {
  const { activeTab } = useAppStore();

  return (
    <Layout>
      {activeTab === 'markets' && <MarketBrowser />}
      {activeTab === 'pipeline' && <PipelineManager />}
      {activeTab === 'queue' && <ActionQueue />}
      {activeTab === 'settings' && <Settings />}
    </Layout>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
