import type { LucideIcon } from 'lucide-react';
import { ActionMenu } from '../ActionMenu/ActionMenu';
import type { ContextMenuItem } from '../ContextMenu/ContextMenu';
import './TableCells.css';

interface MoreItem {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

interface CellMoreProps {
  items: MoreItem[];
  onOpen?: () => void;
}

export function CellMore({ items }: CellMoreProps) {
  const menuItems: ContextMenuItem[] = items.map(item => ({
    type: 'item',
    label: item.label,
    icon: item.icon,
    onClick: item.onClick,
    disabled: item.disabled,
    destructive: item.destructive,
  }));

  return (
    <div className="cell-more">
      <ActionMenu items={menuItems} />
    </div>
  );
}
