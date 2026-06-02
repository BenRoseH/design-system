import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { Pencil, Trash2, Copy, Eye, Globe, Zap, Code } from 'lucide-react';
import { CellText } from './CellText';
import { CellJauge } from './CellJauge';
import { CellTag } from './CellTag';
import { CellAccess } from './CellAccess';
import { CellMore } from './CellMore';
import { CellAvatar } from './CellAvatar';
import { CellHeader } from './CellHeader';

const meta = {
  title: 'Atoms/TableCells',
} satisfies Meta;

export default meta;

const cellStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderBottom: '1px solid #eee',
  verticalAlign: 'middle',
};

const headerStyle: React.CSSProperties = {
  ...cellStyle,
  fontSize: 11,
  color: '#888',
  fontWeight: 600,
  textTransform: 'uppercase',
  paddingBottom: 4,
};

export const CellTextStory = {
  name: 'CellText',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', padding: 16 }}>
      <CellText value="Texte par défaut" variant="default" />
      <CellText value="Texte muted" variant="muted" />
      <CellText value="Texte strong" variant="strong" />
      <CellText value="Un texte très long qui devrait être tronqué avec ellipsis" truncate />
    </div>
  ),
};

export const CellJaugeStory = {
  name: 'CellJauge',
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', padding: 16 }}>
      <div>
        <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>20% — positif</div>
        <CellJauge value={20} total={100} />
      </div>
      <div>
        <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>65% — warning</div>
        <CellJauge value={65} total={100} />
      </div>
      <div>
        <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>90% — négatif</div>
        <CellJauge value={90} total={100} />
      </div>
      <div>
        <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>Sans label</div>
        <CellJauge value={45} total={100} showLabel={false} />
      </div>
    </div>
  ),
};

export const CellTagStory = {
  name: 'CellTag',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
      <div>
        <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>3 tags</div>
        <CellTag tags={[
          { label: 'Actif', status: 'positive' },
          { label: 'Admin', status: 'accent' },
          { label: 'Beta', status: 'info' },
        ]} />
      </div>
      <div>
        <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>6 tags → overflow +3</div>
        <CellTag tags={[
          { label: 'Actif', status: 'positive' },
          { label: 'Admin', status: 'accent' },
          { label: 'Beta', status: 'info' },
          { label: 'Premium', status: 'warning' },
          { label: 'Suspens', status: 'negative' },
          { label: 'VIP', status: 'neutral' },
        ]} />
      </div>
    </div>
  ),
};

export const CellAccessStory = {
  name: 'CellAccess',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
      <div>
        <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>3 accès actifs</div>
        <CellAccess accesses={[
          { label: 'Portal', icon: Globe },
          { label: 'Studio', icon: Zap },
          { label: 'API', icon: Code },
        ]} />
      </div>
      <div>
        <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>Avec un accès désactivé</div>
        <CellAccess accesses={[
          { label: 'Portal', icon: Globe },
          { label: 'Studio', icon: Zap, disabled: true },
          { label: 'API', icon: Code },
        ]} />
      </div>
    </div>
  ),
};

export const CellMoreStory = {
  name: 'CellMore',
  render: () => (
    <div style={{ padding: 16 }}>
      <CellMore items={[
        { label: 'Voir', icon: Eye, onClick: () => alert('Voir') },
        { label: 'Modifier', icon: Pencil, onClick: () => alert('Modifier') },
        { label: 'Dupliquer', icon: Copy, onClick: () => alert('Dupliquer') },
        { label: 'Supprimer', icon: Trash2, onClick: () => alert('Supprimer'), destructive: true },
      ]} />
    </div>
  ),
};

export const CellAvatarStory = {
  name: 'CellAvatar',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', padding: 16 }}>
      <CellAvatar firstName="Harry" lastName="Potter" />
      <CellAvatar firstName="Hermione" lastName="Granger" />
      <CellAvatar firstName="Ron" lastName="Weasley" size="md" />
    </div>
  ),
};

export const CellHeaderStory = {
  name: 'CellHeader',
  render: () => {
    const [sort, setSort] = useState<'asc' | 'desc' | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16, width: 200 }}>
        <div>
          <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>Contrôlé — état actuel : {sort ?? 'null'}</div>
          <CellHeader label="Utilisateur" sortState={sort} onSort={setSort} />
        </div>
        <div>
          <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>Non triable</div>
          <CellHeader label="Statut" sortable={false} />
        </div>
        <div>
          <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>Trié asc</div>
          <CellHeader label="Nom" sortState="asc" />
        </div>
        <div>
          <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>Trié desc</div>
          <CellHeader label="Consommation" sortState="desc" />
        </div>
      </div>
    );
  },
};

export const AllCells = {
  name: 'AllCells — ligne complète',
  render: () => {
    const [sortCol, setSortCol] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(null);

    function handleSort(col: string) {
      return (next: 'asc' | 'desc' | null) => {
        setSortCol(next === null ? null : col);
        setSortDir(next);
      };
    }

    return (
    <table style={{ borderCollapse: 'collapse', width: '100%', tableLayout: 'fixed' }}>
      <colgroup>
        <col />
        <col />
        <col style={{ width: 140 }} />
        <col />
        <col />
        <col style={{ width: 48 }} />
      </colgroup>
      <thead>
        <tr>
          {(['Utilisateur', 'Rôle', 'Consommation', 'Statuts', 'Accès'] as const).map(col => (
            <th key={col} style={{ padding: 0, verticalAlign: 'middle' }}>
              <CellHeader
                label={col}
                sortState={sortCol === col ? sortDir : null}
                onSort={handleSort(col)}
              />
            </th>
          ))}
          <th style={{ padding: 0, width: 48, minWidth: 48 }}><CellHeader label="" sortable={false} /></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={cellStyle}>
            <CellAvatar firstName="Harry" lastName="Potter" />
          </td>
          <td style={cellStyle}>
            <CellText value="Administrateur" variant="default" />
          </td>
          <td style={cellStyle}>
            <CellJauge value={65} total={100} />
          </td>
          <td style={cellStyle}>
            <CellTag tags={[
              { label: 'Actif', status: 'positive' },
              { label: 'Admin', status: 'accent' },
            ]} />
          </td>
          <td style={cellStyle}>
            <CellAccess accesses={[
              { label: 'Portal', icon: Globe },
              { label: 'Studio', icon: Zap },
            ]} />
          </td>
          <td style={{ ...cellStyle, padding: '8px 0', width: 48 }}>
            <CellMore items={[
              { label: 'Voir', icon: Eye, onClick: () => {} },
              { label: 'Modifier', icon: Pencil, onClick: () => {} },
              { label: 'Supprimer', icon: Trash2, onClick: () => {}, destructive: true },
            ]} />
          </td>
        </tr>
        <tr>
          <td style={cellStyle}>
            <CellAvatar firstName="Hermione" lastName="Granger" />
          </td>
          <td style={cellStyle}>
            <CellText value="Lecteur" variant="muted" />
          </td>
          <td style={cellStyle}>
            <CellJauge value={90} total={100} />
          </td>
          <td style={cellStyle}>
            <CellTag tags={[
              { label: 'Inactif', status: 'negative' },
            ]} />
          </td>
          <td style={cellStyle}>
            <CellAccess accesses={[
              { label: 'Portal', icon: Globe, disabled: true },
            ]} />
          </td>
          <td style={{ ...cellStyle, padding: '8px 0', width: 48 }}>
            <CellMore items={[
              { label: 'Voir', icon: Eye, onClick: () => {} },
              { label: 'Supprimer', icon: Trash2, onClick: () => {}, destructive: true },
            ]} />
          </td>
        </tr>
      </tbody>
    </table>
    );
  },
};
