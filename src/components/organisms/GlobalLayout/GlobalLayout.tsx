import { useState } from 'react';
import { Navbar } from '../Navbar/Navbar';
import { GlobalLayoutContext } from './GlobalLayoutContext';
import './GlobalLayout.css';

interface GlobalLayoutProps {
  children?: React.ReactNode;
  navTitle?: string;
  activePath?: string;
  user: { firstName: string; lastName: string; company: string; colorDecoration?: string };
}

export function GlobalLayout({ children, navTitle, activePath, user }: GlobalLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <GlobalLayoutContext.Provider value={{ collapsed }}>
      <div className="global-layout">
        <Navbar
          title={navTitle}
          activePath={activePath}
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
