'use client';
import React, { useState, useContext } from 'react';
import { createClient } from '@/utils/supabase/client';
import { KitchenType } from '@/app/types';
import Box from './Box';
import Button from './Button';
import { AddRounded } from '@mui/icons-material';
import { MessagesContext, MessagesContextType } from '../admin/context/MessagesContext';

export type ApartmentCreatorProps = {
  kitchenType: KitchenType;
};

const ApartmentsCreator = (props: ApartmentCreatorProps) => {
  const supabase = createClient();
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { addMessage } = useContext(MessagesContext) as MessagesContextType;

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    setInputValue(e.target.value);
  };

  const handleCreateNewApartment = async () => {
    if (inputValue.length < 1) {
      addMessage({ message: 'An apartment must have a name', type: 'error' });
      return;
    }
    const createNewApartment = async () => {
      const { data, error } = await supabase
        .from('apartments')
        .insert([{ kitchen_type_id: props.kitchenType.id, name: inputValue }])
        .select();

      if (error) {
        addMessage({ message: 'Error creating apartment', type: 'error' });
        setLoading(false);
      }
      if (data) {
        addMessage({ message: 'Apartment created successfully', type: 'success' });
        setLoading(false);
      }
    };
    setLoading(true);
    createNewApartment();
  };

  return (
    <Box grow primary>
      <h2 className="text-2xl font-bold">Creating new apartment</h2>
      <div className="flex flex-row  items-center gap-2 max-w-lg">
        <p className="text-lg font-semibold text-text">Apartment Name</p>
        <input
          type="text"
          title="Apartment name"
          value={inputValue}
          className="w-1/3 px-4 py-2 text-lg font-semibold rounded text-text bg-background"
          onChange={handleInputChange}
        />
      </div>
      <Button text="Save new apartment" onClick={handleCreateNewApartment} icon={AddRounded} loading={loading} />
    </Box>
  );
};

export default ApartmentsCreator;
