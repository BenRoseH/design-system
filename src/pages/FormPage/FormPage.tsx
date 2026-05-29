import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
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
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
    } else {
      setOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleTransitionEnd = () => {
    if (!isOpen) setMounted(false);
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className="form-page"
      data-open={open || undefined}
      onTransitionEnd={handleTransitionEnd}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        className="form-page__close"
        onClick={onClose}
        aria-label="Fermer"
      >
        <X size={20} strokeWidth={2} />
      </button>

      <div className="form-page__title">
        <Text as="h2" variant="heading-medium">
          {title}
        </Text>
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
    </div>,
    document.body,
  );
}
