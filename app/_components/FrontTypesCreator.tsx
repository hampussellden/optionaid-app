import React, { useState } from 'react';
import classNames from 'classnames';
import Button from './Button';
import { AddRounded } from '@mui/icons-material';
import { createClient } from '@/utils/supabase/client';
7;
import { CreationMessage } from '../types';
import Message from './Message';

type FrontTypesCreatorProps = {
  update: () => void;
};

const FrontTypesCreator = (props: FrontTypesCreatorProps) => {
  const supabase = createClient();
  const [inputValue, setInputValue] = useState<string>('');
  const [message, setMessage] = useState<CreationMessage | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const handleInputValue = (e: React.ChangeEvent<any>) => {
    setInputValue(e.target.value);
  };
  const handleCreateNewFrontTYpe = () => {
    const createFrontType = async () => {
      if (inputValue.length < 1) {
        setMessage({ message: 'A front type must have a name', type: 'error' });
        setLoading(false);
        return;
      }
      const { data, error } = await supabase.from('front_types').insert({ name: inputValue }).select();
      if (error) {
        console.log('error', error);
        setLoading(false);
      }
      if (data) {
        setMessage({ message: 'Front type created successfully', type: 'success' });
        setLoading(false);
        props.update();
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
        className="text-text bg-background rounded py-2 px-4 font-semibold"
        onChange={handleInputValue}
        value={inputValue}
      />
      <div className="ml-auto flex flex-row gap-2">
        {message && <Message message={message} />}
        <Button text="Create new front type" icon={AddRounded} onClick={handleCreateNewFrontTYpe} loading={loading} />
      </div>
    </div>
  );
};

export default FrontTypesCreator;
