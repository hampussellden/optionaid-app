import React, { useState, useContext } from 'react';
import Button from './Button';
import { AddRounded, SaveRounded } from '@mui/icons-material';
import { MessagesContext, MessagesContextType } from '../app/admin/context/MessagesContext';
import { WorktopsContext, WorktopContextType } from '../app/admin/context/WorktopsContext';
import {  WorktopTypeWithoutId } from '../app/types';
import Flex from '@/Containers/Flex';
import Text from './Text';
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
    <Flex as="section" direction="column" classNames='p-2' justify='between' align='stretch' gap={2} width='full'>
      <Flex direction="column" classNames='bg-primary w-full rounded p-2' gap={1}>
        <Text as="h4" size='medium'>
        Creating new worktop type
        </Text>
        <Flex align='center' gap={2}>
          <Text as="p" size="small">Worktop type name</Text>
          <input
            type="text"
            title="Worktop type name"
            value={inputValue}
            className="bg-statbackgroundic text-text p-0.5 rounded"
            onChange={handleInputValue}
          />
          </Flex>
        </Flex>
        <Button fullWidth text="Save new front type" onClick={handleCreateNewWorktopType} icon={SaveRounded} loading={loading} />
    </Flex>
  )
};

export default WorktopTypesCreator;
