import React, { useState, useContext } from 'react';
import Button from './Button';
import { SaveRounded } from '@mui/icons-material';
import { MessagesContext, MessagesContextType } from '../app/admin/context/MessagesContext';
import { FrontsContext, FrontsContextType } from '../app/admin/context/FrontsContext';
import Flex from '@/Containers/Flex';
import Text from './Text';

const FrontTypesCreator = () => {
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
      addMessage(await addFrontType({ name: inputValue }));
      setLoading(false);
    };
    setLoading(true);
    createFrontType();
  };

  return (
    <Flex as="section" direction="column" classNames='p-2' justify='between' align='stretch' gap={4} width='full'>
      <Flex direction="column" classNames='bg-primary w-full rounded p-2' gap={1}>
        <Text as="h4" size='medium'>
          Creating new front type
        </Text>
        <Flex align='center' gap={2}>
          <Text as="p" size="small">Front type name</Text>
          <input
            type="text"
            title="Front type name"
            value={inputValue}
            className="bg-static text-text p-0.5 rounded"
            onChange={handleInputValue}
          />
          </Flex>
        </Flex>
        <Button fullWidth text="Save new project" onClick={handleCreateNewFrontTYpe} icon={SaveRounded} loading={loading} />
    </Flex>
  );
};

export default FrontTypesCreator;
