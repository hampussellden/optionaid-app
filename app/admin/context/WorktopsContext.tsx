'use client';
import React, { createContext, useEffect, useState } from 'react';
import { Worktop, WorktopType, CreationMessage, WorktopWithoutId, WorktopTypeWithoutId } from '@/app/types';
import { createClient } from '@/utilities/supabase/client';

export type WorktopContextType = {
  worktopTypes: WorktopType[];
  addWorktopType: (worktopType: WorktopTypeWithoutId) => Promise<CreationMessage>;
  updateWorktopType: (worktopType: WorktopType) => Promise<CreationMessage>;
  worktops: Worktop[];
  addWorktop: (worktop: WorktopWithoutId) => Promise<CreationMessage>;
  updateWorktop: (worktop: Worktop) => Promise<CreationMessage>;
};
export const WorktopsContext = createContext<WorktopContextType | undefined>(undefined);

const WorktopsProvider = ({ children }: { children: any }) => {
  const supabase = createClient();
  const [worktopTypes, setWorktopTypes] = useState<WorktopType[]>([]);
  const [worktops, setWorktops] = useState<Worktop[]>([]);
  const addWorktopType = async (worktopType: WorktopTypeWithoutId): Promise<CreationMessage> => {
    const { data, error } = await supabase.from('worktop_types').insert({ make: worktopType.make }).select();

    if (error) {
      return { message: 'Error creating worktop type', type: 'error' };
    }

    if (data) {
      let latestWorktopType: WorktopType = {
        id: data[0].id,
        make: worktopType.make,
      };
      setWorktopTypes((prevWorktopTypes) => [...prevWorktopTypes, latestWorktopType]);
      return { message: 'Worktop type created successfully', type: 'success' };
    }
    return { message: 'Something went wrong', type: 'error' };
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

  const updateWorktopType = async (worktopType: WorktopType): Promise<CreationMessage> => {
    const { data, error } = await supabase
      .from('worktop_types')
      .update({ make: worktopType.make })
      .eq('id', worktopType.id)
      .select();

    if (error) return { message: 'An error occured', type: 'error' };
    if (data) {
      let newState = [...worktopTypes];
      let index = newState.findIndex((item) => item.id === worktopType.id);
      newState[index].make = worktopType.make;
      setWorktopTypes(newState);
      return { message: 'Worktop type updated successfully', type: 'success' };
    }
    return { message: 'Something went wrong', type: 'error' };
  };

  const updateWorktop = async (worktop: Worktop): Promise<CreationMessage> => {
    const { data, error } = await supabase
      .from('worktops')
      .update({ name: worktop.name, color: worktop.color })
      .eq('id', worktop.id)
      .select();
    if (error) return { message: 'An error occured', type: 'error' };
    if (data) {
      let newState = [...worktops];
      let index = newState.findIndex((item) => item.id === worktop.id);
      newState[index].name = worktop.name;
      newState[index].color = worktop.color;
      setWorktops(newState);
      return { message: 'Worktop updated successfully', type: 'success' };
    }
    return { message: 'Something went wrong', type: 'error' };
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
