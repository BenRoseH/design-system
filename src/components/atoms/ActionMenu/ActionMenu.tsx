import { Menu } from '@base-ui/react/menu';
import { MoreHorizontal, ChevronRight } from 'lucide-react';
import { Text } from '../Text/Text';
import { Button } from '../Button/Button';
import type { ContextMenuItem } from '../ContextMenu/ContextMenu';
import '../ContextMenu/ContextMenu.css';
import './ActionMenu.css';

interface ActionMenuProps {
  items: ContextMenuItem[];
}

function renderItems(items: ContextMenuItem[]): React.ReactNode {
  return items.map((item, i) => {
    if (item.type === 'separator') {
      return <Menu.Separator key={i} className="context-menu__separator" />;
    }

    if (item.type === 'group') {
      return (
        <Menu.Group key={i} className="context-menu__group">
          {item.label && (
            <Menu.GroupLabel className="context-menu__group-label">
              <Text as="span" variant="body-small-strong" color="muted">
                {item.label}
              </Text>
            </Menu.GroupLabel>
          )}
          {item.items && renderItems(item.items)}
        </Menu.Group>
      );
    }

    const cls = [
      'context-menu__item',
      item.destructive ? 'context-menu__item--destructive' : '',
      item.disabled ? 'context-menu__item--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');

    if (item.items && item.items.length > 0) {
      return (
        <Menu.SubmenuRoot key={i}>
          <Menu.SubmenuTrigger className={cls} disabled={item.disabled}>
            {item.icon && (
              <span className="context-menu__item-icon" aria-hidden="true">
                <item.icon size={16} strokeWidth={2} />
              </span>
            )}
            <Text as="span" variant="body-medium-default">{item.label}</Text>
            <span className="context-menu__item-chevron" aria-hidden="true">
              <ChevronRight size={14} strokeWidth={2} />
            </span>
          </Menu.SubmenuTrigger>
          <Menu.Portal>
            <Menu.Positioner side="right" align="start" sideOffset={4}>
              <Menu.Popup className="context-menu__popup">
                {renderItems(item.items)}
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.SubmenuRoot>
      );
    }

    return (
      <Menu.Item
        key={i}
        className={cls}
        disabled={item.disabled}
        onClick={item.onClick}
      >
        {item.icon && (
          <span className="context-menu__item-icon" aria-hidden="true">
            <item.icon size={16} strokeWidth={2} />
          </span>
        )}
        <Text as="span" variant="body-medium-default">{item.label}</Text>
      </Menu.Item>
    );
  });
}

export function ActionMenu({ items }: ActionMenuProps) {
  return (
    <Menu.Root>
      <Menu.Trigger
        render={
          <Button
            hierarchy="minimal"
            layout="icon-only"
            size="compact"
            icon={MoreHorizontal}
            aria-label="Plus d'actions"
          />
        }
      />
      <Menu.Portal>
        <Menu.Positioner sideOffset={4} align="end">
          <Menu.Popup className="context-menu__popup">
            {renderItems(items)}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
