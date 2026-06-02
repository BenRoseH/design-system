import { useState, useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';
import { AtSign, User as UserIcon, UserCog, Languages, Calendar, Clock, Trash2, Pencil, Shield } from 'lucide-react';
import { Drawer } from '../../atoms/Drawer/Drawer';
import { BentoCard } from '../../molecules/BentoCard/BentoCard';
import { BentoCardUser } from '../../molecules/BentoCard/BentoCardUser';
import { Tag } from '../../atoms/Tag/Tag';
import { Text } from '../../atoms/Text/Text';
import { Button } from '../../atoms/Button/Button';
import { Input } from '../../atoms/Input/Input';
import { Select } from '../../atoms/Select/Select';
import { Field } from '../../atoms/Field/Field';
import { CellJauge } from '../../atoms/TableCells/CellJauge';
import type { DecorativeColor } from '../../atoms/Avatar/Avatar';
import type { User } from '../../../types/user';
import './UserDrawer.css';

type TagStatus = 'positive' | 'neutral' | 'warning';

const STATUT_MAP: Record<string, { status: TagStatus; label: string }> = {
  'Actif': { status: 'positive', label: 'Actif' },
  'Invitation envoyée': { status: 'warning', label: 'Invitation envoyée' },
};

const ROLE_OPTIONS = [
  { value: 'Administrateur', label: 'Administrateur', icon: Shield },
  { value: 'Utilisateur', label: 'Utilisateur', icon: UserIcon },
];

const LANGUAGE_OPTIONS = [
  { value: 'Français', label: 'Français' },
  { value: 'Anglais', label: 'Anglais' },
];

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '–';
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

interface InfoRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

function InfoRow({ icon: Icon, label, value }: InfoRowProps) {
  return (
    <div className="user-drawer__info-row">
      <div className="user-drawer__info-label">
        <Icon size={14} strokeWidth={1.5} />
        <Text variant="body-medium-default" color="muted">{label}</Text>
      </div>
      <Text variant="body-medium-strong">{value || '–'}</Text>
    </div>
  );
}

type UserCreateData = Pick<User, 'first_name' | 'last_name' | 'email' | 'role' | 'language'>;

interface UserDrawerProps {
  user: User | null;
  createOpen?: boolean;
  onClose: () => void;
  onDelete?: (user: User) => void;
  onEdit?: (user: User) => void;
  onAdd?: (data: UserCreateData) => void;
}

export function UserDrawer({ user, createOpen = false, onClose, onDelete, onEdit, onAdd }: UserDrawerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    role: '',
    language: '',
  });

  const isCreateMode = createOpen && !user;

  useEffect(() => {
    if (user) {
      setIsEditing(false);
      setFormValues({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        language: user.language,
      });
    } else if (createOpen) {
      setIsEditing(true);
      setFormValues({ first_name: '', last_name: '', email: '', role: '', language: '' });
    }
  }, [user, createOpen]);

  function handleSave() {
    if (!user) return;
    onEdit?.({ ...user, ...formValues });
    setIsEditing(false);
  }

  function handleCreate() {
    onAdd?.(formValues);
  }

  const statut = user
    ? (STATUT_MAP[user.statut] ?? { status: 'neutral' as TagStatus, label: user.statut || '–' })
    : { status: 'neutral' as TagStatus, label: '–' };
  const pct = user && user.united_total > 0
    ? Math.min(100, Math.round((user.united_used / user.united_total) * 100))
    : 0;

  const footer = isCreateMode ? (
    <>
      <Button hierarchy="minimal" layout="text" onClick={onClose}>
        Annuler
      </Button>
      <Button hierarchy="strong" layout="text" onClick={handleCreate}>
        Créer l'utilisateur
      </Button>
    </>
  ) : user ? (
    isEditing ? (
      <>
        <Button
          hierarchy="minimal"
          layout="text"
          onClick={() => setIsEditing(false)}
        >
          Annuler
        </Button>
        <Button
          hierarchy="strong"
          layout="text"
          onClick={handleSave}
        >
          Enregistrer
        </Button>
      </>
    ) : (
      <>
        <Button
          hierarchy="negative"
          layout="icon-text"
          icon={Trash2}
          onClick={() => onDelete?.(user)}
        >
          Supprimer l'utilisateur
        </Button>
        <Button
          hierarchy="strong"
          layout="icon-text"
          icon={Pencil}
          onClick={() => setIsEditing(true)}
        >
          Modifier
        </Button>
      </>
    )
  ) : undefined;

  return (
    <Drawer
      open={user !== null || createOpen}
      onOpenChange={(open) => { if (!open) onClose(); }}
      title={isCreateMode ? 'Nouvel utilisateur' : 'Détails de l\'utilisateur'}
      footer={footer}
    >
      {isCreateMode ? (
        <BentoCard title="Informations personnelles">
          <div className="user-drawer__edit-form">
            <Field label="Prénom" required htmlFor="create-first_name">
              <Input id="create-first_name" name="first_name" type="text" value={formValues.first_name} onChange={(v) => setFormValues(prev => ({ ...prev, first_name: v }))} icon={UserIcon} />
            </Field>
            <Field label="Nom" required htmlFor="create-last_name">
              <Input id="create-last_name" name="last_name" type="text" value={formValues.last_name} onChange={(v) => setFormValues(prev => ({ ...prev, last_name: v }))} icon={UserIcon} />
            </Field>
            <Field label="Email" required htmlFor="create-email">
              <Input id="create-email" name="email" type="email" value={formValues.email} onChange={(v) => setFormValues(prev => ({ ...prev, email: v }))} icon={AtSign} />
            </Field>
            <Field label="Rôle" required>
              <Select options={ROLE_OPTIONS} value={formValues.role} onChange={(v) => setFormValues(prev => ({ ...prev, role: v }))} icon={UserCog} />
            </Field>
            <Field label="Langue" required>
              <Select options={LANGUAGE_OPTIONS} value={formValues.language} onChange={(v) => setFormValues(prev => ({ ...prev, language: v }))} icon={Languages} />
            </Field>
          </div>
        </BentoCard>
      ) : null}
      {user && (
        <>
          {/* ── Hero card ─────────────────────────────── */}
          <BentoCardUser
            fallback={`${user.first_name[0] ?? ''}${user.last_name[0] ?? ''}`}
            colorDecoration={user.color_decoration as DecorativeColor}
            name={`${user.first_name} ${user.last_name}`}
          >
            {user.statut === 'Actif' ? (
              <div className="user-drawer__hero-activity">
                <Clock size={12} strokeWidth={1.5} />
                <Text variant="body-small-default" color="muted">
                  Dernière activité : {user.last_activity ?? '–'}
                </Text>
              </div>
            ) : (
              <Tag label={statut.label} status={statut.status} showDot size="compact" />
            )}
          </BentoCardUser>

          {/* ── Usages card ───────────────────────────── */}
          <BentoCard title="Usages">
            <div className="user-drawer__usage">
              <CellJauge value={user.united_used} total={user.united_total} />
              <Text variant="body-medium-default" color="muted">
                {pct}% : {user.united_used} unités / {user.united_total}
              </Text>
            </div>
          </BentoCard>

          {/* ── Informations personnelles card ────────── */}
          <BentoCard title="Informations personnelles">
            {isEditing ? (
              <div className="user-drawer__edit-form">
                <Field label="Prénom" required htmlFor="edit-first_name">
                  <Input
                    id="edit-first_name"
                    name="first_name"
                    type="text"
                    value={formValues.first_name}
                    onChange={(v) => setFormValues(prev => ({ ...prev, first_name: v }))}
                    icon={UserIcon}
                  />
                </Field>
                <Field label="Nom" required htmlFor="edit-last_name">
                  <Input
                    id="edit-last_name"
                    name="last_name"
                    type="text"
                    value={formValues.last_name}
                    onChange={(v) => setFormValues(prev => ({ ...prev, last_name: v }))}
                    icon={UserIcon}
                  />
                </Field>
                <Field label="Email" required htmlFor="edit-email">
                  <Input
                    id="edit-email"
                    name="email"
                    type="email"
                    value={formValues.email}
                    onChange={(v) => setFormValues(prev => ({ ...prev, email: v }))}
                    icon={AtSign}
                  />
                </Field>
                <Field label="Rôle" required>
                  <Select
                    options={ROLE_OPTIONS}
                    value={formValues.role}
                    onChange={(v) => setFormValues(prev => ({ ...prev, role: v }))}
                    icon={UserCog}
                  />
                </Field>
                <Field label="Langue" required>
                  <Select
                    options={LANGUAGE_OPTIONS}
                    value={formValues.language}
                    onChange={(v) => setFormValues(prev => ({ ...prev, language: v }))}
                    icon={Languages}
                  />
                </Field>
                <InfoRow icon={Calendar} label="Date de création" value={formatDate(user.created_at)} />
              </div>
            ) : (
              <div className="user-drawer__info-list">
                <InfoRow icon={UserIcon} label="Prénom" value={user.first_name} />
                <InfoRow icon={UserIcon} label="Nom" value={user.last_name} />
                <InfoRow icon={AtSign} label="Adresse e-mail" value={user.email} />
                <InfoRow icon={UserCog} label="Rôle" value={user.role} />
                <InfoRow icon={Calendar} label="Date de création" value={formatDate(user.created_at)} />
                <InfoRow icon={Languages} label="Langue" value={user.language} />
              </div>
            )}
          </BentoCard>
        </>
      )}
    </Drawer>
  );
}
