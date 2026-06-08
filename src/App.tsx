import { Routes, Route, Navigate } from 'react-router-dom';
import ClientsPage from './pages/Clients/ClientsPage';
import UsersPage from './pages/Users/UsersPage';
import { Switch } from './components/atoms/Switch/Switch';
import { useAppContext } from './contexts/AppContext';
import './App.css';

export default function App() {
  const { mode, setMode } = useAppContext()

  return (
    <>
      <Routes>
        <Route path="/orange-business" element={<ClientsPage />} />
        <Route path="/client" element={<UsersPage />} />
        <Route path="*" element={<Navigate to="/orange-business" replace />} />
      </Routes>
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
