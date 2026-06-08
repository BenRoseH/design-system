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
            secondaryAction.icon ? (
              <Button
                hierarchy="default"
                layout="icon-text"
                icon={secondaryAction.icon}
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </Button>
            ) : (
              <Button hierarchy="default" layout="text" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )
          )}
          {primaryAction && (
            primaryAction.icon ? (
              <Button
                hierarchy="brand"
                layout="icon-text"
                icon={primaryAction.icon}
                onClick={primaryAction.onClick}
              >
                {primaryAction.label}
              </Button>
            ) : (
              <Button hierarchy="brand" layout="text" onClick={primaryAction.onClick}>
                {primaryAction.label}
              </Button>
            )
          )}
        </div>
      )}
    </div>
  );
}
