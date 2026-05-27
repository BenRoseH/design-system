import type { LucideIcon } from 'lucide-react';
import { Button } from '../../atoms/Button/Button';
import { Text } from '../../atoms/Text/Text';
import './PageHeader.css';

interface ActionProps {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  primaryAction?: ActionProps;
  secondaryAction?: ActionProps;
}

export function PageHeader({ title, description, primaryAction, secondaryAction }: PageHeaderProps) {
  const hasActions = primaryAction !== undefined || secondaryAction !== undefined;

  return (
    <div className="page-header">
      <div className="page-header__content">
        <Text as="h1" variant="heading-large">{title}</Text>
        {description && (
          <Text as="p" variant="body-large-default" color="muted">{description}</Text>
        )}
      </div>

      {hasActions && (
        <div className="page-header__actions">
          {secondaryAction && (
            <Button
              hierarchy="default"
              layout={secondaryAction.icon ? 'icon-text' : 'text'}
              icon={secondaryAction.icon}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
          {primaryAction && (
            <Button
              hierarchy="brand"
              layout={primaryAction.icon ? 'icon-text' : 'text'}
              icon={primaryAction.icon}
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
