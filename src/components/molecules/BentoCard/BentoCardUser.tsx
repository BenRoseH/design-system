import { Avatar } from '../../atoms/Avatar/Avatar';
import { Text } from '../../atoms/Text/Text';
import type { DecorativeColor } from '../../atoms/Avatar/Avatar';
import './BentoCard.css';

interface BentoCardUserProps {
  fallback: string;
  colorDecoration?: DecorativeColor;
  name: string;
  children: React.ReactNode;
}

export function BentoCardUser({ fallback, colorDecoration, name, children }: BentoCardUserProps) {
  return (
    <div className="bento-card">
      <div className="bento-card-user__hero">
        <Avatar fallback={fallback} colorDecoration={colorDecoration} size="default" />
        <div className="bento-card-user__info">
          <Text as="h3" variant="heading-small">{name}</Text>
          {children}
        </div>
      </div>
    </div>
  );
}
