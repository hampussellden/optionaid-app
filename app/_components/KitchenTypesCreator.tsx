'use client';
import React, { useEffect, useState, useContext } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Project } from '@/app/types';
import { Front, Worktop } from '@/app/types';
import Button from './Button';
import { AddRounded } from '@mui/icons-material';
import Box from './Box';
import { MessagesContext, MessagesContextType } from '../admin/context/MessagesContext';

export type KitchenTypesCreatorProps = {
  project: Project;
  update: () => void;
};

const KitchenTypesCreator = (props: KitchenTypesCreatorProps) => {
  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [fronts, setFronts] = useState<Front[] | null>(null);
  const [worktops, setWorktops] = useState<Worktop[] | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [standardFront, setStandardFront] = useState<Front | null>(null);
  const [standardWorktop, setStandardWorktop] = useState<Worktop | null>(null);
  const { addMessage } = useContext(MessagesContext) as MessagesContextType;

  useEffect(() => {
    const fetchFrontsAndWorktops = async () => {
      const { data: fronts } = await supabase.from('fronts').select('*,front_types(*)');
      const { data: worktops } = await supabase.from('worktops').select('*,worktop_types(*)');
      if (fronts && worktops) {
        setFronts(fronts as Front[]);
        setWorktops(worktops as Worktop[]);
      }
    };
    fetchFrontsAndWorktops();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    setInputValue(e.target.value);
  };

  const handleCreateNewKitchenType = async () => {
    if (inputValue.length < 1) {
      addMessage({ message: 'A kitchen type must have a name', type: 'error' });
      return;
    }
    const createNewKitchenType = async () => {
      const { data, error } = await supabase
        .from('kitchen_types')
        .insert([
          {
            project_id: props.project.id,
            name: inputValue,
            standard_front_id: standardFront?.id || 1,
            standard_worktop_id: standardWorktop?.id || 1,
          },
        ])
        .select();
      if (error) {
        addMessage({ message: 'Error creating kitchen type', type: 'error' });
        setLoading(false);
      }
      if (data) {
        addMessage({ message: 'Kitchen type created successfully', type: 'success' });
        setLoading(false);
        props.update();
      }
    };
    setLoading(true);
    createNewKitchenType();
  };

  const handleStandardFront = (event: React.ChangeEvent<HTMLSelectElement>) => {
    fronts?.filter((front: Front) => {
      if (front.id === parseInt(event.target.value)) {
        setStandardFront(front);
      }
    });
  };
  const handleStandardWorktop = (event: React.ChangeEvent<HTMLSelectElement>) => {
    worktops?.filter((worktop: Worktop) => {
      if (worktop.id === parseInt(event.target.value)) {
        setStandardWorktop(worktop);
      }
    });
  };
  return (
    <Box grow primary>
      <h4 className="text-2xl font-bold">Creating New Kitchen Type</h4>

      <div className="flex flex-row items-center gap-2 max-w-lg">
        <p className="text-lg font-semibold text-text">Type Name</p>
        <input
          type="text"
          value={inputValue}
          className="w-1/2 px-4 py-2 text-xl font-semibold rounded bg-background text-text"
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-row items-center gap-2 max-w-lg">
        <p className="text-lg font-semibold text-text">Standard Front</p>
        <select
          className="rounded w-1/2 px-4 py-2 text-text font-semibold bg-background"
          name="standard-front-picker"
          id="standard-front-picker"
          value={standardFront?.id}
          onChange={handleStandardFront}
        >
          {fronts &&
            fronts.map((front: Front, index: number) => (
              <option value={front.id} selected={index == 0 ? true : false} key={front.id}>
                {front.front_types.name + ' ' + front.name}
              </option>
            ))}
        </select>
      </div>

      <div className="flex flex-row items-center gap-2 ">
        <p className="text-lg font-semibold text-text">Standard Worktop</p>
        <select
          className="rounded px-4 py-2 text-text font-semibold bg-background"
          name="standard-front-picker"
          id="standard-front-picker"
          value={standardWorktop?.id}
          onChange={handleStandardWorktop}
        >
          {worktops &&
            worktops.map((worktop: Worktop, index: number) => (
              <option value={worktop.id} selected={index == 0 ? true : false} key={worktop.id}>
                {worktop.worktop_types.make + ' ' + worktop.name}
              </option>
            ))}
        </select>
      </div>
      <Button icon={AddRounded} text="Save new Type" onClick={handleCreateNewKitchenType} loading={loading} />
    </Box>
  );
};

export default KitchenTypesCreator;
