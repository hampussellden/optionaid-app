'use client';
import React, { useState, useContext } from 'react';
import { createClient } from '@/utilities/supabase/client';
import { KitchenType } from '@/app/types';
import Box from './Box';
import Button from './Button';
import { AddRounded } from '@mui/icons-material';
import { MessagesContext, MessagesContextType } from '../app/admin/context/MessagesContext';
import Text from './Text';
import { ProjectsContext, ProjectsContextType } from '@/app/admin/context/ProjectsContext';

export type ApartmentCreatorProps = {
  kitchenType: KitchenType;
};

const ApartmentsCreator = (props: ApartmentCreatorProps) => {
  const supabase = createClient();
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { addMessage } = useContext(MessagesContext) as MessagesContextType;
  const { addApartment } = useContext(ProjectsContext) as ProjectsContextType;

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    setInputValue(e.target.value);
  };

  const handleCreateNewApartment = async () => {
    setLoading(true);
    if (inputValue.length < 1) {
      addMessage({ message: 'An apartment must have a name', type: 'error' });
      return;
    }
    const newApartment = {
      kitchen_type_id: props.kitchenType.id,
      name: inputValue,
    };
    addMessage(await addApartment(newApartment));
    setLoading(false);
  };

  return (
    <Box grow primary>
      <Text as="h4" size="small" text="Creating new apartment" />
      <div className="flex flex-row  items-center gap-2 max-w-lg">
        <Text as="p" text="Apartment Name" />
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
