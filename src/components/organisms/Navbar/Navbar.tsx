import { useState } from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { NavItem } from '../../atoms/NavItem/NavItem';
import { UserCard } from '../../molecules/UserCard/UserCard';
import { Text } from '../../atoms/Text/Text';
import { Button } from '../../atoms/Button/Button';
import logoOb from '../../../assets/logo-ob.svg';
import { useAppContext } from '../../../contexts/AppContext';
import { useFeatures } from '../../../hooks/useFeatures';
import { navigationConfig } from '../../../config/navigation';
import './Navbar.css';

interface NavbarProps {
  title?: string;
  user: { firstName: string; lastName: string; company: string };
  defaultCollapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
}

export function Navbar({
  title = 'Live Intelligence',
  user,
  defaultCollapsed = false,
  onCollapseChange,
}: NavbarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const { mode, clientId } = useAppContext();
  const { hasFeature, isLoading } = useFeatures(clientId);
  const rawSections = navigationConfig[mode];

  const sections = rawSections.map(section => ({
    ...section,
    items: section.items.filter(item =>
      !item.feature || hasFeature(item.feature)
    ),
  }));

  console.log('mode:', mode)
  console.log('rawSections:', rawSections)
  console.log('hasFeature users:', hasFeature('users'))
  console.log('sections filtrées:', sections)

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
        {isLoading ? (
          <div className="navbar__skeleton">
            <div className="navbar__skeleton-item" />
            <div className="navbar__skeleton-item" />
            <div className="navbar__skeleton-item" />
          </div>
        ) : (
          sections.map((section) => (
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
                    />
                  ) : (
                    <NavItem
                      key={item.label}
                      icon={item.icon}
                      label={item.label}
                    />
                  )
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="navbar__user">
        <UserCard
          firstName={user.firstName}
          lastName={user.lastName}
          company={user.company}
          size="sm"
        />
      </div>

      <div className="navbar__footer">
        <img src={logoOb} alt="OB Business" className="navbar__footer-logo" />
        <small className="navbar__footer-version"><code>V0.1</code></small>
      </div>
    </nav>
  );
}
