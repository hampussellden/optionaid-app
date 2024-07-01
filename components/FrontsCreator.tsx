import React, { useState, useContext } from 'react';
import ColorPicker from './ColorPicker';
import { CheckCircleOutline, CancelOutlined, AddRounded } from '@mui/icons-material';
import Button from './Button';
import { Front, FrontType, FrontWithoutId } from '../app/types';
import Box from './Box';
import { MessagesContext, MessagesContextType } from '../app/admin/context/MessagesContext';
import { FrontsContext, FrontsContextType } from '../app/admin/context/FrontsContext';
import Flex from '@/Containers/Flex';
import Text from './Text';
type FrontsCreatorProps = {
  frontType: FrontType;
};

const FrontsCreator = (props: FrontsCreatorProps) => {
  const [frontColorInput, setFrontColorInput] = useState<string | null>(null);
  const [frontNameInput, setFrontNameInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { addMessage } = useContext(MessagesContext) as MessagesContextType;
  const { addFront } = useContext(FrontsContext) as FrontsContextType;
  const handleFrontColor = (color: string | null) => {
    setFrontColorInput(color);
  };
  const handleFrontNameInput = (e: React.ChangeEvent<any>) => {
    setFrontNameInput(e.target.value);
  };

  const handleCreateNewFront = () => {
    const createFront = async () => {
      if (frontColorInput == null) {
        addMessage({ message: 'A front must have a color', type: 'error' });
        setLoading(false);
        return;
      }
      if (props.frontType == undefined) {
        addMessage({ message: 'A front must have a type', type: 'error' });
        setLoading(false);
        return;
      }
      if (frontNameInput.length < 1) {
        addMessage({ message: 'A front must have a name', type: 'error' });
        setLoading(false);
        return;
      }

      const newFront: FrontWithoutId = {
        name: frontNameInput,
        color: frontColorInput,
        front_type_id: props.frontType.id,
      };
      addMessage(await addFront(newFront));
      setLoading(false);
    };
    setLoading(true);
    createFront();
  };

  return (
    <Flex as="section" direction="column" justify='between' align='stretch' gap={2} width='full'>
      <Flex direction='column' gap={2} width='full' classNames='bg-primary rounded p-2'>
        <Text as='h4' size='small'>
          Creating front on type
        </Text>
        <Flex direction='column' gap={2} width='full'>
          <Text as='p' size='small'>Front Name</Text>
          <input
            className="text-text bg-background rounded py-2 px-4 font-semibold max-w-[30ch]"
            type="text"
            aria-label="Front name"
            value={frontNameInput}
            onChange={handleFrontNameInput}
            />
        </Flex>

      <Flex direction='column' gap={2}>
        <p className="text-lg text-text font-semibold">Change font color code</p>
        <ColorPicker onClick={handleFrontColor} />
        <Flex justify='between'>
          {frontColorInput ? (
            <p className="ml-5 text-lg font-semibold text-text flex flex-row gap-2 items-center">
              Color set
              <CheckCircleOutline />
              <span className="bg-background p-1 rounded">{frontColorInput}</span>
            </p>
          ) : (
            <p className="ml-5 text-lg font-semibold text-text flex flex-row gap-2 items-center">
              No color selected
              <CancelOutlined />
            </p>
          )}
          </Flex>
        </Flex>
      </Flex>
      <Button fullWidth text="Create new front" icon={AddRounded} onClick={handleCreateNewFront} loading={loading} />
    </Flex>
  
  );
};

export default FrontsCreator;
