'use client';
import React, { useState, useContext } from 'react';
import { KitchenType } from '@/app/types';
import Button from './Button';
import { AddRounded } from '@mui/icons-material';
import { MessagesContext, MessagesContextType } from '../app/admin/context/MessagesContext';
import Text from './Text';
import { ProjectsContext, ProjectsContextType } from '@/app/admin/context/ProjectsContext';
import Flex from '@/Containers/Flex';

export type ApartmentCreatorProps = {
  kitchenType: KitchenType;
};

const ApartmentsCreator = (props: ApartmentCreatorProps) => {
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
    <Flex direction='column' gap={2}>
      <Flex direction="column" gap={2} classNames='bg-primary rounded p-2'>
        <Text as="h4" size="small">
        Creating new apartment
        </Text>
        <Flex align='center' gap={2}>
          <Text as="p" size='medium'>
          Apartment Name
          </Text>
          <input
            type="text"
            title="Apartment name"
            value={inputValue}
            className="bg-static text-text p-0.5 rounded"
            onChange={handleInputChange}
            />
        </Flex>
      </Flex>
      <Button fullWidth text="Save new apartment" onClick={handleCreateNewApartment} icon={AddRounded} loading={loading} />
    </Flex>
  );
};

export default ApartmentsCreator;
