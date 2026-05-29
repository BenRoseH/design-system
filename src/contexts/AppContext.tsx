import { createContext, useContext, useState, ReactNode } from 'react'

type AppMode = 'orange-business' | 'client'

type AppContextType = {
  mode: AppMode
  clientId?: string
  setMode: (mode: AppMode) => void
  setClientId: (id: string) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AppMode>('orange-business')
  const [clientId, setClientId] = useState<string | undefined>()

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
