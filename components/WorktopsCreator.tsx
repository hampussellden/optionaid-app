import React, { useState, useContext } from 'react';
import ColorPicker from './ColorPicker';
import { CheckCircleOutline, CancelOutlined, SaveRounded, AddRounded } from '@mui/icons-material';
import { createClient } from '@/utilities/supabase/client';
import Button from './Button';
import { Worktop, WorktopType, WorktopWithoutId } from '../app/types';
import Box from './Box';
import { MessagesContext, MessagesContextType } from '../app/admin/context/MessagesContext';
import { WorktopsContext, WorktopContextType } from '../app/admin/context/WorktopsContext';
import Flex from '@/Containers/Flex';
import Text from './Text';
type WorktopsCreatorProps = {
  worktopType: WorktopType | null;
};

const WorktopsCreator = (props: WorktopsCreatorProps) => {
  const supabase = createClient();
  const { addWorktop } = useContext(WorktopsContext) as WorktopContextType;
  const [worktopColorInput, setWorktopColorInput] = useState<string | null>(null);
  const [worktopNameInput, setWorktopNameInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { addMessage } = useContext(MessagesContext) as MessagesContextType;
  const handleWorktopColor = (color: string | null) => {
    setWorktopColorInput(color);
  };
  const handleWorktopNameInput = (e: React.ChangeEvent<any>) => {
    setWorktopNameInput(e.target.value);
  };

  const handleCreateNewWorktop = () => {
    const createWorktop = async () => {
      if (worktopColorInput == null) {
        addMessage({ message: 'A worktop must have a color', type: 'error' });
        setLoading(false);
        return;
      }
      if (props.worktopType == undefined) {
        addMessage({ message: 'A worktop must have a type', type: 'error' });
        setLoading(false);
        return;
      }
      if (worktopNameInput.length < 1) {
        addMessage({ message: 'A worktop must have a name', type: 'error' });
        setLoading(false);
        return;
      }

      const newWorktop: WorktopWithoutId = {
        name: worktopNameInput,
        color: worktopColorInput,
        worktop_type_id: props.worktopType?.id,
      };
      addMessage(await addWorktop(newWorktop));
      setLoading(false);
    };
    setLoading(true);
    createWorktop();
  };

  return (
    <Flex as='section' direction='column' gap={2}>
      <Flex direction='column' gap={2} classNames='bg-primary rounded p-2'>
        <Flex justify='between' align='center' width='full'>
          <Text as='h4' size='medium'>
            Creating worktop on type
          </Text>
          <Text as='p' size='medium'>
            {props.worktopType?.make}
          </Text>
      </Flex>
      <Flex direction='column' gap={2}>
        <Text as='p' size='medium'>
          Worktop Name
        </Text>
        <input
          type='text'
          title='Worktop name'
          value={worktopNameInput}
          className='bg-background text-text p-0.5 rounded max-w-[30ch]'
          onChange={handleWorktopNameInput}
        />
        </Flex>
          <Flex direction='column' gap={2}>
            <Text as='p' size='medium'>Change font color code</Text>
        
         
         <ColorPicker onClick={handleWorktopColor} />
         <Flex justify='between'>

           {worktopColorInput ? (
             <p className="ml-5 text-lg font-semibold text-text flex flex-row gap-2 items-center">
               Color set
               <CheckCircleOutline />
               <span className="bg-background p-1 rounded">{worktopColorInput}</span>
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
         <Button fullWidth text="Create new worktop" icon={AddRounded} onClick={handleCreateNewWorktop} loading={loading} />
    </Flex>
  )
};

export default WorktopsCreator;
