import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useUsers } from './hooks/useUsers';

import { Button, type ButtonHierarchy } from './components/atoms/Button/Button';
import './App.css';

const hierarchies: ButtonHierarchy[] = ['default', 'strong', 'negative', 'brand', 'minimal'];

function App() {
  const [dark, setDark] = useState(false);
  const { data: users, isLoading, error } = useUsers();

  useEffect(() => {
    console.log('[useUsers] loading:', isLoading, '| error:', error, '| data:', users);
  }, [users, isLoading, error]);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : '';
  }

  return (
    <main className="app">
      <div className="app__topbar">
        <Button hierarchy="minimal" onClick={toggleTheme}>
          {dark ? 'Light mode' : 'Dark mode'}
        </Button>
      </div>

      <section className="app__section">
        <h1 className="app__section-title">Button — hiérarchies</h1>
        <div className="app__rows">
          {hierarchies.map((hierarchy) => (
            <div key={hierarchy} className="app__row">
              <span className="app__label">{hierarchy}</span>
              <Button hierarchy={hierarchy} size="default">label</Button>
              <Button hierarchy={hierarchy} size="compact">label</Button>
            </div>
          ))}
        </div>
      </section>

      <section className="app__section">
        <h1 className="app__section-title">Button — layouts</h1>
        <div className="app__row">
          <Button hierarchy="brand" layout="text">label</Button>
          <Button hierarchy="brand" layout="text-icon" icon={ArrowRight}>label</Button>
          <Button hierarchy="brand" layout="icon-text" icon={ArrowRight}>label</Button>
          <Button hierarchy="brand" layout="icon-only" icon={ArrowRight} aria-label="Suivant" />
        </div>
      </section>

    </main>
  );
}

export default App;
