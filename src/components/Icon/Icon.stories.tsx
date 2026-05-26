import type { Meta, StoryObj } from '@storybook/react';
import {
  ArrowRight, ArrowLeft, ArrowUp, ArrowDown,
  Plus, Minus, X, Check, Search,
  RefreshCw, Heart, Star, Bookmark,
  Bell, Settings, User, Users, Home,
  File, Folder, Download, Upload,
  Copy, Pencil, Trash2, Link, Clipboard,
  Lock, LockOpen, Eye, EyeOff, LogIn, LogOut,
  Tag, Calendar, Clock,
  AlertTriangle, Info, CheckCircle, XCircle,
  Database, Table, BarChart2, LineChart,
  List, LayoutGrid, Filter, ArrowUpAZ,
  EllipsisVertical, Globe,
} from 'lucide-react';

const meta = {
  title: 'Foundation/Icons',
  parameters: {
    controls: { disable: true },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const icons = [
  // Navigation
  { name: 'ArrowRight',        Icon: ArrowRight },
  { name: 'ArrowLeft',         Icon: ArrowLeft },
  { name: 'ArrowUp',           Icon: ArrowUp },
  { name: 'ArrowDown',         Icon: ArrowDown },
  { name: 'RefreshCw',         Icon: RefreshCw },
  // Actions
  { name: 'Plus',              Icon: Plus },
  { name: 'Minus',             Icon: Minus },
  { name: 'X',                 Icon: X },
  { name: 'Check',             Icon: Check },
  { name: 'Search',            Icon: Search },
  { name: 'Copy',              Icon: Copy },
  { name: 'Pencil',            Icon: Pencil },
  { name: 'Trash2',            Icon: Trash2 },
  { name: 'Link',              Icon: Link },
  { name: 'Clipboard',         Icon: Clipboard },
  { name: 'Download',          Icon: Download },
  { name: 'Upload',            Icon: Upload },
  // Auth & users
  { name: 'User',              Icon: User },
  { name: 'Users',             Icon: Users },
  { name: 'Lock',              Icon: Lock },
  { name: 'LockOpen',          Icon: LockOpen },
  { name: 'Eye',               Icon: Eye },
  { name: 'EyeOff',            Icon: EyeOff },
  { name: 'LogIn',             Icon: LogIn },
  { name: 'LogOut',            Icon: LogOut },
  // UI & navigation
  { name: 'Bell',              Icon: Bell },
  { name: 'Settings',          Icon: Settings },
  { name: 'Home',              Icon: Home },
  { name: 'EllipsisVertical',  Icon: EllipsisVertical },
  { name: 'Filter',            Icon: Filter },
  { name: 'ArrowUpAZ',         Icon: ArrowUpAZ },
  { name: 'List',              Icon: List },
  { name: 'LayoutGrid',        Icon: LayoutGrid },
  { name: 'Globe',             Icon: Globe },
  // Content
  { name: 'File',              Icon: File },
  { name: 'Folder',            Icon: Folder },
  { name: 'Tag',               Icon: Tag },
  { name: 'Calendar',          Icon: Calendar },
  { name: 'Clock',             Icon: Clock },
  { name: 'Bookmark',          Icon: Bookmark },
  { name: 'Heart',             Icon: Heart },
  { name: 'Star',              Icon: Star },
  // Status & feedback
  { name: 'CheckCircle',       Icon: CheckCircle },
  { name: 'XCircle',           Icon: XCircle },
  { name: 'AlertTriangle',     Icon: AlertTriangle },
  { name: 'Info',              Icon: Info },
  // Data
  { name: 'Database',          Icon: Database },
  { name: 'Table',             Icon: Table },
  { name: 'BarChart2',         Icon: BarChart2 },
  { name: 'LineChart',         Icon: LineChart },
];

export const Showcase: Story = {
  render: () => (
    <>
      <style>{`
        .icon-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
          gap: 24px;
          padding: 24px;
        }
        .icon-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .icon-item__name {
          font-size: 11px;
          line-height: 1.3;
          text-align: center;
          color: var(--color-content-muted);
          word-break: break-all;
        }
      `}</style>
      <div className="icon-grid">
        {icons.map(({ name, Icon }) => (
          <div key={name} className="icon-item">
            <Icon size={24} color="var(--color-content-default)" strokeWidth={2} />
            <span className="icon-item__name">{name}</span>
          </div>
        ))}
      </div>
    </>
  ),
};
