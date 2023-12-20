'use client';
import { createContext, useEffect, useState } from 'react';
import { Worktop, WorktopType } from '@/app/types';
import { createClient } from '@/utils/supabase/client';

export type WorktopContextType = {
  worktopTypes: WorktopType[];
  addWorktopType: (worktopType: WorktopType) => void;
  updateWorktopType: (input: string, id: number) => void;
  worktops: Worktop[];
  addWorktop: (worktop: Worktop) => void;
  updateWorktop: (input: string, worktopColor: string, id: number) => void;
};
export const WorktopsContext = createContext<WorktopContextType | undefined>(undefined);

const WorktopsProvider = ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const [worktopTypes, setWorktopTypes] = useState<WorktopType[]>([]);
  const [worktops, setWorktops] = useState<Worktop[]>([]);

  const addWorktopType = (worktopType: WorktopType) => {
    setWorktopTypes((prevWorktopTypes) => [...prevWorktopTypes, worktopType]);
  };
  const addWorktop = (worktop: Worktop) => {
    setWorktops((prevWorktops) => [...prevWorktops, worktop]);
  };

  const updateWorktopType = (input: string, id: number) => {
    let newState = [...worktopTypes];
    let index = newState.findIndex((worktopType) => worktopType.id === id);
    newState[index].make = input;
    setWorktopTypes(newState);
  };

  const updateWorktop = (input: string, worktopColor: string, id: number) => {
    let newState = [...worktops];
    let index = newState.findIndex((worktop) => worktop.id === id);
    newState[index].name = input;
    newState[index].color = worktopColor;
    setWorktops(newState);
  };
  useEffect(() => {
    const fetchWorktopTypes = async () => {
      const { data: types, error } = await supabase.from('worktop_types').select('*');
      if (error) {
        console.error(error);
        return;
      }
      if (types) {
        setWorktopTypes(types);
      }
    };
    fetchWorktopTypes();
  }, []);
  useEffect(() => {
    const fetchWorktops = async () => {
      const { data: worktops, error } = await supabase.from('worktops').select('*');
      if (error) {
        console.error(error);
        return;
      }
      if (worktops) {
        setWorktops(worktops as Worktop[]);
      }
    };
    fetchWorktops();
  }, []);

  return (
    <>
      <WorktopsContext.Provider
        value={{ worktopTypes, addWorktopType, updateWorktopType, worktops, addWorktop, updateWorktop }}
      >
        {children}
      </WorktopsContext.Provider>
    </>
  );
};

export default WorktopsProvider;
