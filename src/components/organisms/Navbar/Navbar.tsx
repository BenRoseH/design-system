import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { NavItem } from '../../atoms/NavItem/NavItem';
import { UserCard } from '../../molecules/UserCard/UserCard';
import { Text } from '../../atoms/Text/Text';
import { Button } from '../../atoms/Button/Button';
import './Navbar.css';

export interface NavItemData {
  label: string;
  icon: LucideIcon;
  selected?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export interface NavSection {
  label: string;
  items: NavItemData[];
}

interface NavbarProps {
  title?: string;
  sections: NavSection[];
  user: { firstName: string; lastName: string; company: string };
  defaultCollapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
}

export function Navbar({
  title = 'Live Intelligence',
  sections,
  user,
  defaultCollapsed = false,
  onCollapseChange,
}: NavbarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  function handleToggle() {
    const next = !collapsed;
    setCollapsed(next);
    onCollapseChange?.(next);
  }

  return (
    <nav
      className={`navbar${collapsed ? ' navbar--collapsed' : ''}`}
      aria-label="Navigation principale"
    >
      <div className="navbar__header">
        <span className="navbar__title">
          <Text as="span" variant="body-large-strong">{title}</Text>
        </span>
        <Button
          hierarchy="minimal"
          layout="icon-only"
          icon={collapsed ? PanelLeftOpen : PanelLeftClose}
          aria-label={collapsed ? 'Ouvrir la navigation' : 'Fermer la navigation'}
          onClick={handleToggle}
        />
      </div>

      <div className="navbar__sections">
        {sections.map((section) => (
          <div className="navbar__section" key={section.label}>
            <span className="navbar__section-label">
              <Text as="span" variant="body-small-default" color="muted">
                {section.label}
              </Text>
            </span>
            <div className="navbar__section-items">
              {section.items.map((item) =>
                collapsed ? (
                  <NavItem
                    key={item.label}
                    icon={item.icon}
                    aria-label={item.label}
                    selected={item.selected}
                    disabled={item.disabled}
                    onClick={item.onClick}
                  />
                ) : (
                  <NavItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    selected={item.selected}
                    disabled={item.disabled}
                    onClick={item.onClick}
                  />
                )
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="navbar__user">
        <UserCard
          firstName={user.firstName}
          lastName={user.lastName}
          company={user.company}
          size="sm"
        />
      </div>
    </nav>
  );
}
