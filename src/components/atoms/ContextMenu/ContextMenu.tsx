import { ContextMenu as CM } from '@base-ui/react/context-menu';
import { ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Text } from '../Text/Text';
import './ContextMenu.css';

export type ContextMenuItem = {
  type: 'item' | 'separator' | 'group';
  label?: string;
  icon?: LucideIcon;
  disabled?: boolean;
  destructive?: boolean;
  onClick?: () => void;
  items?: ContextMenuItem[];
};

interface ContextMenuProps {
  items: ContextMenuItem[];
  children: React.ReactNode;
}

function itemClass(item: ContextMenuItem) {
  return [
    'context-menu__item',
    item.destructive ? 'context-menu__item--destructive' : '',
    item.disabled ? 'context-menu__item--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

function renderItems(items: ContextMenuItem[]): React.ReactNode {
  return items.map((item, i) => {
    if (item.type === 'separator') {
      return <CM.Separator key={i} className="context-menu__separator" />;
    }

    if (item.type === 'group') {
      return (
        <CM.Group key={i} className="context-menu__group">
          {item.label && (
            <CM.GroupLabel className="context-menu__group-label">
              <Text as="span" variant="body-small-strong" color="muted">
                {item.label}
              </Text>
            </CM.GroupLabel>
          )}
          {item.items && renderItems(item.items)}
        </CM.Group>
      );
    }

    if (item.items && item.items.length > 0) {
      return (
        <CM.SubmenuRoot key={i}>
          <CM.SubmenuTrigger className={itemClass(item)} disabled={item.disabled}>
            {item.icon && (
              <span className="context-menu__item-icon" aria-hidden="true">
                <item.icon size={16} strokeWidth={2} />
              </span>
            )}
            <Text as="span" variant="body-medium-default">{item.label}</Text>
            <span className="context-menu__item-chevron" aria-hidden="true">
              <ChevronRight size={14} strokeWidth={2} />
            </span>
          </CM.SubmenuTrigger>
          <CM.Portal>
            <CM.Positioner side="right" align="start" sideOffset={4}>
              <CM.Popup className="context-menu__popup">
                {renderItems(item.items)}
              </CM.Popup>
            </CM.Positioner>
          </CM.Portal>
        </CM.SubmenuRoot>
      );
    }

    return (
      <CM.Item
        key={i}
        className={itemClass(item)}
        disabled={item.disabled}
        onClick={item.onClick}
      >
        {item.icon && (
          <span className="context-menu__item-icon" aria-hidden="true">
            <item.icon size={16} strokeWidth={2} />
          </span>
        )}
        <Text as="span" variant="body-medium-default">{item.label}</Text>
      </CM.Item>
    );
  });
}

export function ContextMenu({ items, children }: ContextMenuProps) {
  return (
    <CM.Root>
      <CM.Trigger className="context-menu__trigger">
        {children}
      </CM.Trigger>
      <CM.Portal>
        <CM.Positioner>
          <CM.Popup className="context-menu__popup">
            {renderItems(items)}
          </CM.Popup>
        </CM.Positioner>
      </CM.Portal>
    </CM.Root>
  );
}
