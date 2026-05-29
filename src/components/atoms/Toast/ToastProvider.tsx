import { createContext, useContext, useMemo } from 'react';
import { Toast } from '@base-ui/react/toast';
import { ToastItem, type ToastData } from './Toast';

interface ToastContextValue {
  toast: (data: ToastData) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

function ToastConsumer({ children }: { children: React.ReactNode }) {
  const manager = Toast.useToastManager();

  const value = useMemo<ToastContextValue>(
    () => ({
      toast: (data: ToastData) =>
        manager.add({
          timeout: data.duration ?? 4000,
          data,
        }),
      dismiss: (id: string) => manager.close(id),
    }),
    [manager],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast.Viewport className="toast-viewport">
        {manager.toasts.map((t) => (
          <ToastItem
            key={t.id}
            toast={t}
            onClose={() => manager.close(t.id)}
          />
        ))}
      </Toast.Viewport>
    </ToastContext.Provider>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <Toast.Provider timeout={4000} limit={5}>
      <ToastConsumer>{children}</ToastConsumer>
    </Toast.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
