'use client';

import { Apartment, Front, FrontType, KitchenType, Project, User, Worktop, WorktopType } from '@/app/types';
import { createClient } from '@/utilities/supabase/client';
import { createContext, useEffect, useState } from 'react';

export type AppState =
  | 'EditProject'
  | 'CreateProject'
  | 'EditWorktopType'
  | 'CreateWorktopType'
  | 'EditFrontType'
  | 'CreateFrontType';
export type AppContextType = {
  state: AppState;
  user: User | null;
  selectedProject: Project | null;
  selectedKitchenType: KitchenType | null;
  selectedApartment: Apartment | null;
  selectedFrontType: FrontType | null;
  selectedFront: Front | null;
  selectedWorktopType: WorktopType | null;
  selectedWorktop: Worktop | null;
  changeAppState: (state: AppState) => void;
  changeSelectedProject: (project: Project | null) => void;
  changeSelectedKitchenType: (kitchenType: KitchenType | null) => void;
  changeSelectedApartment: (apartment: Apartment | null) => void;
  changeSelectedFrontType: (frontType: FrontType | null) => void;
  changeSelectedFront: (front: Front | null) => void;
  changeSelectedWorktopType: (worktopType: WorktopType | null) => void;
  changeSelectedWorktop: (worktop: Worktop | null) => void;
};
export const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: any }) => {
  const supabase = createClient();
  const [state, setState] = useState<AppContextType['state']>('EditProject');
  const [user, setUser] = useState<User | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedKitchenType, setSelectedKitchenType] = useState<KitchenType | null>(null);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const [selectedFrontType, setSelectedFrontType] = useState<FrontType | null>(null);
  const [selectedFront, setSelectedFront] = useState<Front | null>(null);
  const [selectedWorktopType, setSelectedWorktopType] = useState<WorktopType | null>(null);
  const [selectedWorktop, setSelectedWorktop] = useState<Worktop | null>(null);
  const changeAppState = (newState: AppState) => {
    setState(newState);
  };
  const changeSelectedProject = (project: Project | null) => {
    setSelectedProject(project);
  };
  const changeSelectedKitchenType = (kitchenType: KitchenType | null) => {
    setSelectedKitchenType(kitchenType);
  };
  const changeSelectedApartment = (apartment: Apartment | null) => {
    setSelectedApartment(apartment);
  };
  const changeSelectedFrontType = (frontType: FrontType | null) => {
    setSelectedFrontType(frontType);
  };
  const changeSelectedFront = (front: Front | null) => {
    setSelectedFront(front);
  };
  const changeSelectedWorktopType = (worktopType: WorktopType | null) => {
    setSelectedWorktopType(worktopType);
  };
  const changeSelectedWorktop = (worktop: Worktop | null) => {
    setSelectedWorktop(worktop);
  };
  useEffect(() => {
    const getLoggedInUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!data?.user) return;
      if (data.user.id) {
        const { data: user, error } = await supabase.from('users').select('*').eq('id', data?.user?.id);
        if (user && user[0]) {
          setUser(user[0] as User);
        }
      }
    };
    getLoggedInUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        user,
        selectedProject,
        selectedKitchenType,
        selectedApartment,
        selectedFrontType,
        selectedFront,
        selectedWorktopType,
        selectedWorktop,
        changeAppState,
        changeSelectedProject,
        changeSelectedKitchenType,
        changeSelectedApartment,
        changeSelectedFrontType,
        changeSelectedFront,
        changeSelectedWorktopType,
        changeSelectedWorktop,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
