import { useState } from 'react';
import { Navbar } from '../Navbar/Navbar';
import type { NavSection } from '../Navbar/Navbar';
import { GlobalLayoutContext } from './GlobalLayoutContext';
import './GlobalLayout.css';

interface GlobalLayoutProps {
  children?: React.ReactNode;
  navTitle?: string;
  sections: NavSection[];
  user: { firstName: string; lastName: string; company: string };
}

export function GlobalLayout({ children, navTitle, sections, user }: GlobalLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <GlobalLayoutContext.Provider value={{ collapsed }}>
      <div className="global-layout">
        <Navbar
          title={navTitle}
          sections={sections}
          user={user}
          onCollapseChange={setCollapsed}
        />
        <main className="global-layout__main">
          <div className="global-layout__body container">
            {children}
          </div>
        </main>
      </div>
    </GlobalLayoutContext.Provider>
  );
}
