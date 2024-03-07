import React, { useState, useContext } from 'react';
import Button from './Button';
import { AddRounded } from '@mui/icons-material';
import { createClient } from '@/utils/supabase/client';
import { MessagesContext, MessagesContextType } from '../admin/context/MessagesContext';
import { WorktopsContext, WorktopContextType } from '../admin/context/WorktopsContext';
import { WorktopType, WorktopTypeWithoutId } from '../types';
type WorktopTypesCreatorProps = {};

const WorktopTypesCreator = (props: WorktopTypesCreatorProps) => {
  const { addWorktopType } = useContext(WorktopsContext) as WorktopContextType;
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { addMessage } = useContext(MessagesContext) as MessagesContextType;

  const handleCreateNewWorktopType = () => {
    const createWorktopType = async () => {
      if (inputValue.length < 1) {
        addMessage({ message: 'A worktop type must have a name', type: 'error' });
        setLoading(false);
        return;
      }
      const newWorktopType: WorktopTypeWithoutId = {
        make: inputValue,
      };
      addMessage(await addWorktopType(newWorktopType));
      setLoading(false);
    };
    setLoading(true);
    createWorktopType();
  };
  const handleInputValue = (e: React.ChangeEvent<any>) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="grow bg-primary rounded p-4 flex flex-col gap-4">
      <p className="text-2xl font-bold text-text">Creating worktop type</p>
      <p className="text-lg font-semibold text-text">Worktop make</p>
      <input
        type="text"
        aria-aria-label="Worktop make"
        className="text-text bg-background rounded py-2 px-4 font-semibold"
        onChange={handleInputValue}
        value={inputValue}
      />
      <div className="flex flex-row gap-4 ml-auto">
        <Button
          text="Create new worktop type"
          icon={AddRounded}
          loading={loading}
          onClick={handleCreateNewWorktopType}
        />
      </div>
    </div>
  );
};

export default WorktopTypesCreator;
