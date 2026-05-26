import { createContext, useContext } from 'react';

interface GlobalLayoutContextValue {
  collapsed: boolean;
}

export const GlobalLayoutContext = createContext<GlobalLayoutContextValue>({
  collapsed: false,
});

export function useGlobalLayout() {
  return useContext(GlobalLayoutContext);
}
