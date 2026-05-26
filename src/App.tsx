import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Accordion } from './components/atoms/Accordion/Accordion';
import { Button, type ButtonHierarchy } from './components/atoms/Button/Button';
import './App.css';

const accordionItems = [
  {
    value: 'item-1',
    trigger: "Qu'est-ce que Base UI ?",
    panel: "Base UI est une bibliothèque de composants headless pour React. Elle fournit des comportements accessibles sans imposer de styles, ce qui vous laisse un contrôle total sur l'apparence.",
  },
  {
    value: 'item-2',
    trigger: 'Comment utiliser les tokens CSS ?',
    panel: 'Les tokens sont définis comme des custom properties CSS dans tokens.css. Importez ce fichier une seule fois dans main.tsx et utilisez-les partout avec var(--nom-du-token).',
  },
  {
    value: 'item-3',
    trigger: 'Item désactivé',
    panel: "Ce contenu n'est pas accessible car l'item est désactivé.",
    disabled: true,
  },
];

const hierarchies: ButtonHierarchy[] = ['default', 'strong', 'negative', 'brand', 'minimal'];

function App() {
  const [dark, setDark] = useState(false);

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

      <section className="app__section">
        <h1 className="app__section-title">Accordion</h1>
        <Accordion items={accordionItems} defaultValue={['item-1']} />
      </section>
    </main>
  );
}

export default App;
