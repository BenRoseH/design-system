import type { Decorator } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { supabase } from '../../src/lib/supabase';

function SupabaseErrorBoundary({ children }: { children: React.ReactNode }) {
  const url = (supabase as any).supabaseUrl as string | undefined;
  if (!url) {
    return (
      <div style={{ padding: '16px', background: '#fee2e2', borderRadius: '8px', fontFamily: 'monospace' }}>
        <strong>Supabase non configuré</strong>
        <p style={{ margin: '8px 0 0' }}>
          Vérifiez que <code>VITE_SUPABASE_URL</code> et <code>VITE_SUPABASE_ANON_KEY</code> sont définis dans votre fichier <code>.env</code>.
        </p>
      </div>
    );
  }
  return <>{children}</>;
}

export const withSupabase: Decorator = (Story) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        retry: 1,
      },
    },
  });

  return (
    <SupabaseErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    </SupabaseErrorBoundary>
  );
};
