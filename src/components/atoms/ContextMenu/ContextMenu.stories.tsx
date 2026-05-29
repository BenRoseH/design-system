import type { Meta, StoryObj } from '@storybook/react';
import {
  Eye,
  Pencil,
  Copy,
  Trash2,
  Star,
  Download,
  Share2,
  Lock,
  UserCircle,
  Mail,
  Settings,
  Archive,
  FolderOpen,
} from 'lucide-react';
import { ContextMenu } from './ContextMenu';
import type { ContextMenuItem } from './ContextMenu';

const meta = {
  title: 'Atoms/ContextMenu',
  component: ContextMenu,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ============================================================
   SHARED TRIGGER ZONE
   ============================================================ */

function TriggerZone({ label = 'Clic droit ici pour afficher le menu' }: { label?: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        background: '#f4f4f4',
        border: '1px dashed #d0d0d0',
        borderRadius: 8,
        cursor: 'context-menu',
        userSelect: 'none',
        color: '#888',
        fontSize: 14,
      }}
    >
      {label}
    </div>
  );
}

/* ============================================================
   DEFAULT
   ============================================================ */

const defaultItems: ContextMenuItem[] = [
  { type: 'item', label: 'Voir' },
  { type: 'item', label: 'Modifier' },
  { type: 'item', label: 'Dupliquer' },
  { type: 'separator' },
  { type: 'item', label: 'Supprimer', icon: Trash2, destructive: true },
];

export const Default: Story = {
  args: {
    items: defaultItems,
    children: <TriggerZone />,
  },
};

/* ============================================================
   WITH ICONS
   ============================================================ */

const withIconsItems: ContextMenuItem[] = [
  { type: 'item', label: 'Voir', icon: Eye },
  { type: 'item', label: 'Modifier', icon: Pencil },
  { type: 'item', label: 'Dupliquer', icon: Copy },
  { type: 'item', label: 'Télécharger', icon: Download },
  { type: 'item', label: 'Partager', icon: Share2 },
  { type: 'separator' },
  { type: 'item', label: 'Supprimer', icon: Trash2, destructive: true },
];

export const WithIcons: Story = {
  args: {
    items: withIconsItems,
    children: <TriggerZone />,
  },
};

/* ============================================================
   WITH GROUP
   ============================================================ */

const withGroupItems: ContextMenuItem[] = [
  {
    type: 'group',
    label: 'Actions',
    items: [
      { type: 'item', label: 'Voir', icon: Eye },
      { type: 'item', label: 'Modifier', icon: Pencil },
    ],
  },
  { type: 'separator' },
  {
    type: 'group',
    label: 'Fichier',
    items: [
      { type: 'item', label: 'Dupliquer', icon: Copy },
      { type: 'item', label: 'Archiver', icon: Archive },
      { type: 'item', label: 'Télécharger', icon: Download },
    ],
  },
  { type: 'separator' },
  {
    type: 'group',
    label: 'Danger',
    items: [
      { type: 'item', label: 'Supprimer', icon: Trash2, destructive: true },
    ],
  },
];

export const WithGroup: Story = {
  args: {
    items: withGroupItems,
    children: <TriggerZone />,
  },
};

/* ============================================================
   WITH SUBMENU
   ============================================================ */

const withSubmenuItems: ContextMenuItem[] = [
  { type: 'item', label: 'Voir', icon: Eye },
  {
    type: 'item',
    label: 'Déplacer vers',
    icon: FolderOpen,
    items: [
      { type: 'item', label: 'Mes documents' },
      { type: 'item', label: 'Projets' },
      { type: 'item', label: 'Archives' },
    ],
  },
  {
    type: 'item',
    label: 'Partager avec',
    icon: Share2,
    items: [
      { type: 'item', label: 'Toute l\'équipe' },
      { type: 'item', label: 'Administrateurs seulement' },
      { type: 'separator' },
      { type: 'item', label: 'Lien de partage', icon: Copy },
    ],
  },
  { type: 'separator' },
  { type: 'item', label: 'Supprimer', icon: Trash2, destructive: true },
];

export const WithSubmenu: Story = {
  args: {
    items: withSubmenuItems,
    children: <TriggerZone />,
  },
};

/* ============================================================
   WITH DISABLED
   ============================================================ */

const withDisabledItems: ContextMenuItem[] = [
  { type: 'item', label: 'Voir', icon: Eye },
  { type: 'item', label: 'Modifier', icon: Pencil, disabled: true },
  { type: 'item', label: 'Dupliquer', icon: Copy },
  { type: 'item', label: 'Verrouiller', icon: Lock, disabled: true },
  { type: 'item', label: 'Mettre en favori', icon: Star },
  { type: 'separator' },
  { type: 'item', label: 'Supprimer', icon: Trash2, destructive: true, disabled: true },
];

export const WithDisabled: Story = {
  args: {
    items: withDisabledItems,
    children: <TriggerZone />,
  },
};

/* ============================================================
   ON TABLE ROW
   ============================================================ */

const tableRowItems: ContextMenuItem[] = [
  { type: 'item', label: 'Voir le profil', icon: UserCircle },
  { type: 'item', label: 'Modifier', icon: Pencil },
  { type: 'item', label: 'Copier l\'email', icon: Mail },
  { type: 'item', label: 'Paramètres du compte', icon: Settings },
  { type: 'separator' },
  { type: 'item', label: 'Supprimer l\'utilisateur', icon: Trash2, destructive: true },
];

export const OnTableRow: Story = {
  render: () => (
    <div
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: 8,
        overflow: 'hidden',
        fontFamily: 'inherit',
      }}
    >
      {['Harry Potter', 'Hermione Granger', 'Ron Weasley'].map((name, i) => (
        <ContextMenu key={i} items={tableRowItems}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 16px',
              borderBottom: i < 2 ? '1px solid #f0f0f0' : 'none',
              cursor: 'context-menu',
              background: '#fff',
              fontSize: 14,
              color: '#1a1a1a',
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: ['#FF6B00', '#4C9BE8', '#E84C4C'][i],
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: 12,
                flexShrink: 0,
              }}
            >
              {name.split(' ').map(n => n[0]).join('')}
            </div>
            <span style={{ flex: 1 }}>{name}</span>
            <span style={{ color: '#888', fontSize: 12 }}>Administrateur</span>
          </div>
        </ContextMenu>
      ))}
    </div>
  ),
  args: { items: tableRowItems, children: null },
};
