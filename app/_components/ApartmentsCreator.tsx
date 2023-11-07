'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { KitchenType } from '@/app/types';
import { CreationMessage } from '@/app/types';
import classNames from 'classnames';
import Box from './Box';
import Message from './Message';

export type ApartmentCreatorProps = {
  kitchenType: KitchenType;
};

const ApartmentsCreator = (props: ApartmentCreatorProps) => {
  const supabase = createClient();
  const [inputValue, setInputValue] = useState<string>('');
  const [message, setMessage] = useState<CreationMessage | null>(null);

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    setInputValue(e.target.value);
  };

  const handleCreateNewApartment = async () => {
    if (inputValue.length < 1) {
      setMessage({ message: 'An apartment must have a name', type: 'error' });
      return;
    }
    const createNewApartment = async () => {
      const { data, error } = await supabase
        .from('apartments')
        .insert([{ kitchen_type_id: props.kitchenType.id, name: inputValue }])
        .select();

      if (error) console.log('error', error);
      if (data) {
        setMessage({ message: 'Apartment created successfully', type: 'success' });
      }
    };
    createNewApartment();
  };

  return (
    <Box grow primary>
      <h4 className="text-2xl font-bold">Creating new apartment</h4>
      {message && <Message message={message} />}
      <div className="flex flex-row  items-center gap-2 max-w-lg">
        <p className="text-lg font-semibold text-text">Apartment Name</p>
        <input
          type="text"
          value={inputValue}
          className="w-1/3 px-4 py-2 text-lg font-semibold rounded text-text bg-background focus:outline outline-accent"
          onChange={handleInputChange}
        />
      </div>
      <button
        className="rounded bg-accent mt-auto py-2 px-4 text-xl w-fit font-semibold self-end hover:bg-accentHover"
        onClick={handleCreateNewApartment}
      >
        Save new apartment
      </button>
    </Box>
  );
};

export default ApartmentsCreator;
