'use client';

import { createContext, useEffect, useState } from 'react';

export type AppState =
  | 'EditProject'
  | 'CreateProject'
  | 'EditKitchenType'
  | 'CreateKitchenType'
  | 'EditApartment'
  | 'CreateApartment'
  | 'EditWorktopType'
  | 'CreateWorktopType'
  | 'EditWorktop'
  | 'CreateWorktop'
  | 'EditFrontType'
  | 'CreateFrontType'
  | 'EditFront'
  | 'CreateFront';
export type AppContextType = {
  state: AppState;
  id: number;
  changeAppState: (state: AppState, id: number) => void;
};
export const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: any }) => {
  const [state, setState] = useState<AppContextType['state']>('EditProject');
  const [id, setId] = useState<number>(0);
  const changeAppState = (state: AppContextType['state'], id: number) => {
    setState(state);
    setId(id);
  };

  return <AppContext.Provider value={{ state, id, changeAppState }}>{children}</AppContext.Provider>;
};
export default AppProvider;
