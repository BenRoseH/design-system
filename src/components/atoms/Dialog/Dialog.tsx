import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { AlertCircle, Trash2, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '../Button/Button';
import './Dialog.css';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  icon?: LucideIcon;
  intent?: 'destructive';
  cancelLabel?: string;
  confirmLabel?: string;
  confirmIcon?: LucideIcon;
  onConfirm?: () => void;
  loading?: boolean;
}

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  icon: HeaderIcon = AlertCircle,
  intent = 'destructive',
  cancelLabel = 'Annuler',
  confirmLabel = 'Confirmer',
  confirmIcon: ConfirmIcon = Trash2,
  onConfirm,
  loading,
}: DialogProps) {
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="dialog__backdrop" />
        <BaseDialog.Popup className="dialog__popup">

          <div className="dialog__header">
            <span className={`dialog__header-icon dialog__header-icon--${intent}`}>
              <HeaderIcon size={24} strokeWidth={2} />
            </span>
            <BaseDialog.Title className="dialog__title">
              {title}
            </BaseDialog.Title>
            <BaseDialog.Close
              className="dialog__header-close"
              render={
                <Button
                  hierarchy="minimal"
                  layout="icon-only"
                  icon={X}
                  aria-label="Fermer"
                />
              }
            />
          </div>

          <div className="dialog__body">
            <BaseDialog.Description className="dialog__description">
              {description}
            </BaseDialog.Description>
          </div>

          <div className="dialog__divider" />

          <div className="dialog__footer">
            <BaseDialog.Close
              render={
                <Button hierarchy="default" layout="icon-text" icon={X}>
                  {cancelLabel}
                </Button>
              }
            />
            <Button
              hierarchy="negative"
              layout="icon-text"
              icon={ConfirmIcon}
              onClick={onConfirm}
              loading={loading}
            >
              {confirmLabel}
            </Button>
          </div>

        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
