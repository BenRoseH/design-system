import ClientsPage from './pages/Clients/ClientsPage';
import UsersPage from './pages/Users/UsersPage';
import { Switch } from './components/atoms/Switch/Switch';
import { useAppContext } from './contexts/AppContext';
import './App.css';

export default function App() {
  const { mode, setMode } = useAppContext()

  return (
    <>
      {mode === 'orange-business' ? <ClientsPage /> : <UsersPage />}
      <div className="mode-switch">
        <span className="mode-switch__label">Client</span>
        <Switch
          size="sm"
          checked={mode === 'orange-business'}
          onChange={(checked) => setMode(checked ? 'orange-business' : 'client')}
        />
        <span className="mode-switch__label">OB</span>
      </div>
    </>
  )
}
