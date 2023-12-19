'use client';
import { createContext, useEffect, useState } from 'react';
import { Front, FrontType } from '@/app/types';
import { createClient } from '@/utils/supabase/client';

export type FrontsContextType = {
  frontTypes: FrontType[];
  addFrontType: (frontType: FrontType) => void;
  updateFrontType: (input: string, id: number) => void;
  fronts: Front[];
  addFront: (front: Front) => void;
  updateFront: (input: string, frontColor: string, id: number) => void;
};
export const FrontsContext = createContext<FrontsContextType | undefined>(undefined);

const FrontsProvider = ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const [frontTypes, setFrontTypes] = useState<FrontType[]>([]);
  const [fronts, setFronts] = useState<Front[]>([]);

  const addFrontType = (frontType: FrontType) => {
    setFrontTypes((prevFrontTypes) => [...prevFrontTypes, frontType]);
  };
  const addFront = (front: Front) => {
    setFronts((prevFronts) => [...prevFronts, front]);
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
