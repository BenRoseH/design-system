import { useRef } from 'react';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { X } from 'lucide-react';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import './Drawer.css';

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export function Drawer({ open, onOpenChange, title, footer, children }: DrawerProps) {
  const initialFocusRef = useRef<HTMLDivElement>(null);

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="drawer__backdrop" />
        <BaseDialog.Popup className="drawer__popup" initialFocus={initialFocusRef}>

          <div className="drawer__header" ref={initialFocusRef} tabIndex={-1}>
            {title && (
              <BaseDialog.Title>
                <Text as="span" variant="heading-medium">{title}</Text>
              </BaseDialog.Title>
            )}
            <BaseDialog.Close
              className="drawer__close"
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

          <div className="drawer__body">
            {children}
          </div>

          {footer && (
            <div className="drawer__footer">
              {footer}
            </div>
          )}

        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
