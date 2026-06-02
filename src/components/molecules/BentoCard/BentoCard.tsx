import { Text } from '../../atoms/Text/Text';
import './BentoCard.css';

interface BentoCardProps {
  title: string;
  children: React.ReactNode;
}

export function BentoCard({ title, children }: BentoCardProps) {
  return (
    <div className="bento-card">
      <Text variant="body-medium-strong">{title}</Text>
      {children}
    </div>
  );
}
