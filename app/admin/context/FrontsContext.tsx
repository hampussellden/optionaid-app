'use client';
import { createContext, useEffect, useState } from 'react';
import { CreationMessage, Front, FrontType, FrontTypeWithoutId, FrontWithoutId } from '@/app/types';
import { createClient } from '@/utils/supabase/client';

export type FrontsContextType = {
  frontTypes: FrontType[];
  addFrontType: (frontType: FrontTypeWithoutId) => Promise<CreationMessage>;
  updateFrontType: (input: string, id: number) => void;
  fronts: Front[];
  addFront: (front: FrontWithoutId) => Promise<CreationMessage>;
  updateFront: (input: string, frontColor: string, id: number) => void;
};
export const FrontsContext = createContext<FrontsContextType | undefined>(undefined);

const FrontsProvider = ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const [frontTypes, setFrontTypes] = useState<FrontType[]>([]);
  const [fronts, setFronts] = useState<Front[]>([]);

  const addFrontType = async (frontType: FrontTypeWithoutId): Promise<CreationMessage> => {
    const { data, error } = await supabase.from('front_types').insert({ name: frontType.name }).select();

    if (error) {
      return { message: 'Error creating front type', type: 'error' };
    }
    if (data) {
      const latestFrontType: FrontType = {
        id: data[0].id,
        name: frontType.name,
      };
      setFrontTypes((prevFrontTypes) => [...prevFrontTypes, latestFrontType]);
      return { message: 'Front type created successfully', type: 'success' };
    }
    return { message: '', type: 'error' };
  };
  const addFront = async (front: FrontWithoutId): Promise<CreationMessage> => {
    const { data, error } = await supabase
      .from('fronts')
      .insert([{ name: front.name, color: front.color, front_type_id: front.front_type_id }])
      .select();

    if (error) {
      return { message: 'Error creating front', type: 'error' };
    }
    if (data) {
      const latestFront: Front = {
        id: data[0].id,
        name: front.name,
        color: front.color,
        front_type_id: front.front_type_id,
      };
      setFronts((prevFronts) => [...prevFronts, latestFront]);
      return { message: 'Front created successfully', type: 'success' };
    }
    return { message: '', type: 'error' };
  };

  const updateFrontType = (input: string, id: number) => {
    let newState = [...frontTypes];
    let index = newState.findIndex((frontType) => frontType.id === id);
    newState[index].name = input;
    setFrontTypes(newState);
  };

  const updateFront = (input: string, frontColor: string, id: number) => {
    let newState = [...fronts];
    let index = newState.findIndex((front) => front.id === id);
    newState[index].name = input;
    newState[index].color = frontColor;
    setFronts(newState);
  };
  useEffect(() => {
    const fetchFrontTypes = async () => {
      const { data: types, error } = await supabase.from('front_types').select('*');
      if (error) {
        console.error(error);
        return;
      }
      if (types) {
        setFrontTypes(types);
      }
    };
    fetchFrontTypes();
  }, []);
  useEffect(() => {
    const fetchFronts = async () => {
      const { data: fronts, error } = await supabase.from('fronts').select('*');
      if (error) {
        console.error(error);
        return;
      }
      if (fronts) {
        setFronts(fronts as Front[]);
      }
    };
    fetchFronts();
  }, []);

  return (
    <>
      <FrontsContext.Provider value={{ frontTypes, addFrontType, updateFrontType, fronts, addFront, updateFront }}>
        {children}
      </FrontsContext.Provider>
    </>
  );
};

export default FrontsProvider;
