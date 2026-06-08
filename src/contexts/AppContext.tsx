import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export type AppMode = 'orange-business' | 'client'

type AppContextType = {
  mode: AppMode
  clientId?: string
  setMode: (mode: AppMode) => void
  setClientId: (id: string) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [clientId, setClientId] = useState<string | undefined>()

  // Le mode est dérivé de l'URL : /client => 'client', sinon 'orange-business'
  const mode: AppMode = location.pathname.startsWith('/client') ? 'client' : 'orange-business'

  const setMode = (next: AppMode) => {
    navigate(next === 'client' ? '/client' : '/orange-business')
  }

  return (
    <AppContext.Provider value={{ mode, clientId, setMode, setClientId }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within AppProvider')
  return ctx
}
