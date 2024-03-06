'use client';
import React, { createContext, useEffect, useState } from 'react';
import { Worktop, WorktopType, CreationMessage, WorktopWithoutId } from '@/app/types';
import { createClient } from '@/utils/supabase/client';

export type WorktopContextType = {
  worktopTypes: WorktopType[];
  addWorktopType: (worktopType: WorktopType) => void;
  updateWorktopType: (input: string, id: number) => void;
  worktops: Worktop[];
  addWorktop: (worktop: WorktopWithoutId) => Promise<CreationMessage>;
  updateWorktop: (input: string, worktopColor: string, id: number) => void;
};
export const WorktopsContext = createContext<WorktopContextType | undefined>(undefined);

const WorktopsProvider = ({ children }: { children: any }) => {
  const supabase = createClient();
  const [worktopTypes, setWorktopTypes] = useState<WorktopType[]>([]);
  const [worktops, setWorktops] = useState<Worktop[]>([]);
  const addWorktopType = (worktopType: WorktopType) => {
    setWorktopTypes((prevWorktopTypes) => [...prevWorktopTypes, worktopType]);
  };
  const addWorktop = async (worktop: WorktopWithoutId): Promise<CreationMessage> => {
    const { data, error } = await supabase
      .from('worktops')
      .insert([{ name: worktop.name, color: worktop.color, worktop_type_id: worktop.worktop_type_id }])
      .select();

    if (error) {
      return { message: 'Error creating worktop', type: 'error' };
    }

    if (data) {
      const latestWorktop: Worktop = {
        id: data[0].id,
        worktop_type_id: worktop.worktop_type_id,
        color: worktop.color,
        name: worktop.name,
      };
      setWorktops((prevWorktops) => [...prevWorktops, latestWorktop]);
      return { message: 'Worktop created successfully', type: 'success' };
    }
    return { message: '', type: 'error' };
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
