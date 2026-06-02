import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Text } from '../../components/atoms/Text/Text';
import { Button } from '../../components/atoms/Button/Button';
import './FormPage.css';

interface FormPageProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  onNext?: () => void;
  backLabel?: string;
  nextLabel?: string;
  nextIcon?: LucideIcon;
  nextIconSide?: 'left' | 'right';
  nextDisabled?: boolean;
  formId?: string;
  children: React.ReactNode;
}

export function FormPage({
  title,
  isOpen,
  onClose,
  onBack,
  onNext,
  backLabel = 'Retour',
  nextLabel = 'Suivant',
  nextIcon = ArrowRight,
  nextIconSide = 'right',
  nextDisabled = false,
  formId,
  children,
}: FormPageProps) {
  return (
    <BaseDialog.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <BaseDialog.Portal>
        <BaseDialog.Popup className="form-page">

          <BaseDialog.Close
            className="form-page__close"
            render={<button aria-label="Fermer"><X size={20} strokeWidth={2} /></button>}
          />

          <div className="form-page__title">
            <BaseDialog.Title render={<span />}>
              <Text as="h2" variant="heading-medium">{title}</Text>
            </BaseDialog.Title>
          </div>

          <div className="form-page__body">
            {children}
          </div>

          <div className="form-page__footer">
            {onBack && (
              <Button
                hierarchy="minimal"
                layout="icon-text"
                icon={ArrowLeft}
                onClick={onBack}
              >
                {backLabel}
              </Button>
            )}
            <span className="form-page__footer-spacer" />
            {(onNext || formId) && (
              <Button
                hierarchy="strong"
                layout={nextIconSide === 'left' ? 'icon-text' : 'text-icon'}
                icon={nextIcon}
                type={formId ? 'submit' : 'button'}
                form={formId}
                onClick={formId ? undefined : onNext}
                disabled={nextDisabled}
              >
                {nextLabel}
              </Button>
            )}
          </div>

        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
