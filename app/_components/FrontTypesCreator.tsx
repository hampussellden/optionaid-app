import React, { useState, useContext } from 'react';
import Button from './Button';
import { AddRounded } from '@mui/icons-material';
import { createClient } from '@/utils/supabase/client';
import { MessagesContext, MessagesContextType } from '../admin/context/MessagesContext';
import { FrontsContext, FrontsContextType } from '../admin/context/FrontsContext';
import { FrontType } from '../types';
type FrontTypesCreatorProps = {};

const FrontTypesCreator = (props: FrontTypesCreatorProps) => {
  const supabase = createClient();
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { addMessage } = useContext(MessagesContext) as MessagesContextType;
  const { addFrontType } = useContext(FrontsContext) as FrontsContextType;

  const handleInputValue = (e: React.ChangeEvent<any>) => {
    setInputValue(e.target.value);
  };
  const handleCreateNewFrontTYpe = () => {
    const createFrontType = async () => {
      if (inputValue.length < 1) {
        addMessage({ message: 'A front type must have a name', type: 'error' });
        setLoading(false);
        return;
      }
      const { data, error } = await supabase.from('front_types').insert({ name: inputValue }).select();
      if (error) {
        addMessage({ message: 'Error creating front type', type: 'error' });
        setLoading(false);
      }
      if (data) {
        addMessage({ message: 'Front type created successfully', type: 'success' });
        setLoading(false);
        let myFrontType = {} as FrontType;
        myFrontType.id = data[0].id;
        myFrontType.name = inputValue;
        addFrontType(myFrontType);
      }
    };
    setLoading(true);
    createFrontType();
  };

  return (
    <div className="flex flex-col bg-primary grow rounded p-4 gap-4">
      <p className="text-2xl font-semibold text-text">Creating front type</p>
      <p className="text-lg font-semibold text-text">Front type name</p>
      <input
        type="text"
        title="Front type name"
        className="text-text bg-background rounded py-2 px-4 font-semibold"
        onChange={handleInputValue}
        value={inputValue}
      />
      <div className="ml-auto flex flex-row gap-2">
        <Button text="Create new front type" icon={AddRounded} onClick={handleCreateNewFrontTYpe} loading={loading} />
      </div>
    </div>
  );
};

export default FrontTypesCreator;
