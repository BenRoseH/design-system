import type { Preview } from '@storybook/react-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { supabase } from '../src/lib/supabase';
import { ToastProvider } from '../src/components/atoms/Toast/ToastProvider';
import { AppProvider, useAppContext } from '../src/contexts/AppContext';
import type { AppMode } from '../src/contexts/AppContext';
import '../src/tokens/index.css';
import '../src/index.css';

function SupabaseRealTimeSync({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!import.meta.env.VITE_SUPABASE_URL) return;

    const channel = supabase
      .channel('storybook-sync')
      .on('postgres_changes', { event: '*', schema: 'public' }, () => {
        queryClient.invalidateQueries();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return <>{children}</>;
}

function AppModeSync({ mode }: { mode: AppMode }) {
  const { setMode } = useAppContext();
  useEffect(() => {
    setMode(mode);
  }, [mode, setMode]);
  return null;
}

const preview: Preview = {
  globalTypes: {
    appMode: {
      description: 'Mode applicatif',
      toolbar: {
        title: 'Mode',
        icon: 'switchalt',
        items: [
          { value: 'orange-business', title: 'Orange Business' },
          { value: 'client', title: 'Client' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const clientRef = useRef<QueryClient | null>(null);
      if (!clientRef.current) {
        clientRef.current = new QueryClient({
          defaultOptions: {
            queries: {
              staleTime: 0,
              retry: 1,
            },
          },
        });
      }
      const appMode = (context.globals.appMode as AppMode) || 'orange-business';
      return (
        <QueryClientProvider client={clientRef.current}>
          <AppProvider>
            <AppModeSync mode={appMode} />
            <ToastProvider>
              <SupabaseRealTimeSync>
                <Story />
              </SupabaseRealTimeSync>
            </ToastProvider>
          </AppProvider>
        </QueryClientProvider>
      );
    },
    withThemeByDataAttribute({
      themes: {
        Light: '',
        Dark: 'dark',
      },
      defaultTheme: 'Light',
      attributeName: 'data-theme',
    }),
  ],
  parameters: {
    options: {
      storySort: {
        order: ['Atoms', 'Molecules', 'Organisms', 'Tables', 'Pages', 'Flows'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
