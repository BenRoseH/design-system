import { Avatar as BaseAvatar } from '@base-ui/react/avatar';
import './Avatar.css';

type AvatarSize = 'default' | 'compact';
export type DecorativeColor = 'green' | 'blue' | 'yellow' | 'purple' | 'pink' | 'brown';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
  size?: AvatarSize;
  colorDecoration?: DecorativeColor;
  delay?: number;
}

export function Avatar({ src, alt, fallback, size = 'default', colorDecoration, delay = 600 }: AvatarProps) {
  const classes = [
    'avatar',
    size === 'compact' ? 'avatar--compact' : '',
    colorDecoration ? `avatar--${colorDecoration}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <BaseAvatar.Root className={classes}>
      {src && <BaseAvatar.Image src={src} alt={alt} className="avatar__image" />}
      <BaseAvatar.Fallback delay={src ? delay : 0} className="avatar__fallback">
        {fallback}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}
