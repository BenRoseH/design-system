import { UserCard } from '../../molecules/UserCard/UserCard';
import './TableCells.css';

interface CellAvatarProps {
  firstName: string;
  lastName: string;
  colorDecoration?: string;
  size?: 'sm' | 'md';
}

export function CellAvatar({ firstName, lastName, colorDecoration, size = 'sm' }: CellAvatarProps) {
  return (
    <div className="cell-avatar">
      <UserCard firstName={firstName} lastName={lastName} colorDecoration={colorDecoration as any} size={size} />
    </div>
  );
}
