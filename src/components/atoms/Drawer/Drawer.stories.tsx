import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PanelRight } from 'lucide-react';
import { Drawer } from './Drawer';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';

const meta = {
  title: 'Atoms/Drawer',
  component: Drawer,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ============================================================
   DEFAULT
   ============================================================ */

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button hierarchy="default" layout="icon-text" icon={PanelRight} onClick={() => setOpen(true)}>
          Ouvrir le drawer
        </Button>
        <Drawer open={open} onOpenChange={setOpen}>
          <div className="drawer-story__content">
            <Text as="h2" variant="heading-large">Titre du drawer</Text>
            <Text variant="body-large-default" color="muted">
              Le contenu du drawer peut accueillir n'importe quel composant. Il glisse depuis la droite et se ferme via le bouton × ou en cliquant sur le backdrop.
            </Text>
          </div>
        </Drawer>
      </>
    );
  },
  args: { open: false, onOpenChange: () => {}, children: null },
};
