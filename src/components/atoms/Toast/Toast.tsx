import { Toast } from '@base-ui/react/toast';
import { CheckCircle, XCircle, AlertTriangle, Info, Bell, X } from 'lucide-react';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import './Toast.css';

export type ToastVariant = 'positive' | 'negative' | 'warning' | 'info' | 'neutral';

export interface ToastData {
  title: string;
  description?: string;
  variant: ToastVariant;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

type ToastObject = React.ComponentProps<typeof Toast.Root>['toast'];

interface ToastItemProps {
  toast: ToastObject;
  onClose: () => void;
}

const VARIANT_ICONS: Record<ToastVariant, React.ComponentType<{ size: number; strokeWidth: number }>> = {
  positive: CheckCircle,
  negative: XCircle,
  warning: AlertTriangle,
  info: Info,
  neutral: Bell,
};

export function ToastItem({ toast: toastObj, onClose }: ToastItemProps) {
  const data = (toastObj as { data: ToastData }).data;
  const IconComponent = VARIANT_ICONS[data.variant];
  const duration = data.duration ?? 4000;
  const showProgress = duration > 0;

  return (
    <Toast.Root
      toast={toastObj}
      className={`toast toast--${data.variant}`}
    >
      <span className="toast__icon" aria-hidden="true">
        <IconComponent size={20} strokeWidth={2} />
      </span>

      <div className="toast__content">
        <Toast.Title className="toast__title">
          <Text as="span" variant="body-medium-strong">
            {data.title}
          </Text>
        </Toast.Title>

        {data.description && (
          <Toast.Description className="toast__description">
            <Text as="span" variant="body-small-default" color="muted">
              {data.description}
            </Text>
          </Toast.Description>
        )}

        {data.action && (
          <div className="toast__action">
            <Button
              hierarchy="minimal"
              size="compact"
              onClick={data.action.onClick}
            >
              {data.action.label}
            </Button>
          </div>
        )}
      </div>

      <Button
        hierarchy="minimal"
        layout="icon-only"
        size="compact"
        icon={X}
        aria-label="Fermer"
        onClick={onClose}
        className="toast__close"
      />

      {showProgress && (
        <div
          className="toast__progress"
          style={{ '--toast-duration': `${duration}ms` } as React.CSSProperties}
        />
      )}
    </Toast.Root>
  );
}
