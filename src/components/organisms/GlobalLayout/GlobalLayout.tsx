import { useState } from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Button } from '../../atoms/Button/Button';
import { PageHeader } from '../../molecules/PageHeader/PageHeader';
import './GlobalLayout.css';

interface GlobalLayoutProps {
  children?: React.ReactNode;
}

export function GlobalLayout({ children }: GlobalLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="global-layout">
      <nav
        className={`global-layout__nav${collapsed ? ' global-layout__nav--collapsed' : ''}`}
        aria-label="Navigation principale"
      >
        <div className="global-layout__nav-toggle">
          <Button
            hierarchy="minimal"
            layout="icon-only"
            icon={collapsed ? PanelLeftOpen : PanelLeftClose}
            aria-label={collapsed ? 'Ouvrir la navigation' : 'Fermer la navigation'}
            onClick={() => setCollapsed(prev => !prev)}
          />
        </div>
      </nav>
      <main className="global-layout__main">
        <div className="global-layout__body container">
          <PageHeader
            title="Utilisateurs"
            description="Créez et modifiez les utilisateurs de Live Intelligence."
          />
          {children}
        </div>
      </main>
    </div>
  );
}
