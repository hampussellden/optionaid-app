'use client';
import { createContext, useEffect, useState } from 'react';
import { CreationMessage, Front, FrontType, FrontTypeWithoutId, FrontWithoutId } from '@/app/types';
import { createClient } from '@/utils/supabase/client';

export type FrontsContextType = {
  frontTypes: FrontType[];
  addFrontType: (frontType: FrontTypeWithoutId) => Promise<CreationMessage>;
  updateFrontType: (frontType: FrontType) => Promise<CreationMessage>;
  fronts: Front[];
  addFront: (front: FrontWithoutId) => Promise<CreationMessage>;
  updateFront: (front: Front) => Promise<CreationMessage>;
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
    return { message: 'Something went wrong', type: 'error' };
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
    return { message: 'Something went wrong', type: 'error' };
  };

  const updateFrontType = async (frontType: FrontType): Promise<CreationMessage> => {
    const { data, error } = await supabase
      .from('front_types')
      .update({ name: frontType.name })
      .eq('id', frontType.id)
      .select();
    if (error) {
      return { message: 'Error updating front type', type: 'error' };
    }
    if (data) {
      let newState = [...frontTypes];
      let index = newState.findIndex((frontType) => frontType.id === frontType.id);
      newState[index].name = frontType.name;
      setFrontTypes(newState);

      return { message: 'Front type updated successfully', type: 'success' };
    }
    return { message: 'Something went wrong', type: 'error' };
  };

  const updateFront = async (front: Front): Promise<CreationMessage> => {
    const { data, error } = await supabase
      .from('fronts')
      .update({ name: front.name, color: front.color })
      .eq('id', front.id)
      .select();
    if (error) {
      return { message: 'Error updating front', type: 'error' };
    }
    if (data) {
      const updatedFront: Front = {
        id: front.id,
        name: front.name,
        color: front.color,
        front_type_id: front.front_type_id,
      };
      let newState = [...fronts];
      let index = newState.findIndex((item) => item.id === updatedFront.id);
      newState[index].name = updateFront.name;
      newState[index].color = updatedFront.color;
      setFronts(newState);
      return { message: 'Front updated successfully', type: 'success' };
    }
    return { message: 'Something went wrong', type: 'error' };
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
