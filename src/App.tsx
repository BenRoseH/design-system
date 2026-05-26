import { ArrowRight } from '@phosphor-icons/react';
import { Accordion } from './components/Accordion/Accordion';
import { Button, type ButtonHierarchy } from './components/Button/Button';

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
  return (
    <main style={{ maxWidth: '640px', margin: '4rem auto', padding: '0 1rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Button</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '4rem' }}>
        {hierarchies.map((hierarchy) => (
          <div key={hierarchy} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>{hierarchy}</span>
            <Button hierarchy={hierarchy} size="default">label</Button>
            <Button hierarchy={hierarchy} size="compact">label</Button>
          </div>
        ))}
      </div>

      <h1 style={{ marginBottom: '2rem' }}>Button — layouts (brand / default)</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4rem' }}>
        <Button hierarchy="brand" layout="text-only">label</Button>
        <Button hierarchy="brand" layout="text-icon" icon={ArrowRight}>label</Button>
        <Button hierarchy="brand" layout="icon-text" icon={ArrowRight}>label</Button>
        <Button hierarchy="brand" layout="icon-only" icon={ArrowRight} aria-label="Suivant" />
      </div>

      <h1 style={{ marginBottom: '2rem' }}>Accordion</h1>
      <Accordion items={accordionItems} defaultValue={['item-1']} />
    </main>
  );
}

export default App;
