import React, { useState, useContext } from 'react';
import { Worktop, WorktopType } from '../app/types';
import ColorPicker from './ColorPicker';
import { CancelOutlined, CheckCircleOutline, SaveRounded } from '@mui/icons-material';
import Button from './Button';
import { MessagesContext, MessagesContextType } from '../app/admin/context/MessagesContext';
import { WorktopsContext, WorktopContextType } from '../app/admin/context/WorktopsContext';
import Text from './Text';
import Flex from '@/Containers/Flex';

type WorktopsEditorProps = {
  worktopType: WorktopType;
  worktop?: Worktop | null;
};

const WorktopsEditor = (props: WorktopsEditorProps) => {
  const { updateWorktop, updateWorktopType } = useContext(WorktopsContext) as WorktopContextType;
  const [loading, setLoading] = useState<boolean>(false);
  const [worktopTypeInputValue, setWorktopTypeInputValue] = useState<string>('');
  const [worktopInputValue, setWorktopInputValue] = useState<string>('');
  const [worktopColorInput, setWorktopColorInput] = useState<string | null>(null);
  const { addMessage } = useContext(MessagesContext) as MessagesContextType;
  const color = props.worktop?.color;
  const handleWorktopTypeInputValue = (e: React.ChangeEvent<any>) => {
    setWorktopTypeInputValue(e.target.value);
  };
  const handleWorktopInputValue = (e: React.ChangeEvent<any>) => {
    setWorktopInputValue(e.target.value);
  };
  const handleWorktopColor = (color: string | null) => {
    setWorktopColorInput(color);
  };
  const handleSaveWorktopTypeChanges = () => {
    const updateWorktopTypeContextAndDatabase = async () => {
      if (worktopTypeInputValue.length < 1) {
        addMessage({ message: 'A worktop type must have a name', type: 'error' });
        setLoading(false);
        return;
      }
      const updatedWorktop: WorktopType = {
        id: props.worktopType.id,
        make: worktopTypeInputValue,
      };
      addMessage(await updateWorktopType(updatedWorktop));
      setLoading(false);
    };
    setLoading(true);
    updateWorktopTypeContextAndDatabase();
  };
  const handleSaveWorktopChanges = () => {
    const updateWorktopContextAndDatabase = async () => {
      if (props.worktop?.id == undefined || null) return;
      if (!worktopColorInput) {
        addMessage({ message: 'A worktop must have a color', type: 'error' });
        setLoading(false);
        return;
      }
      var name = worktopInputValue.length < 1 ? props.worktop?.name : worktopInputValue;
      var color = worktopColorInput;
      var id = props.worktop?.id;

      const updatedWorktop: Worktop = {
        id: id,
        name: name,
        color: color,
        worktop_type_id: props.worktopType.id,
      };
      addMessage(await updateWorktop(updatedWorktop));
      setLoading(false);
    };
    setLoading(true);
    updateWorktopContextAndDatabase();
  };

  return (
    <Flex direction='column' align='center' gap={4}>
      <Flex direction="column" gap={2} width='full'>
        <Flex direction="column"  align="center" gap={2} classNames="bg-primary rounded p-2">
          <Flex justify="between" width='full'>
            <Text as="h4" size="small">
              Editing Worktop Group
            </Text>
            <Text as="p" size="small">
            {props.worktopType.make}
            </Text>
          </Flex>
          <Flex direction='column' align='start' width='full'>
            <Text as='p'>Change Worktop type name</Text>
            <input
              type="text"
              title="Worktop type name"
              value={worktopTypeInputValue}
              onChange={handleWorktopTypeInputValue}
              className="text-text bg-static rounded py-1 px-2 max-w-[20ch]"
              />
          </Flex>
        </Flex>
      <Button fullWidth text="Save Changes" icon={SaveRounded} onClick={handleSaveWorktopTypeChanges} />
      </Flex>

      {props.worktop && (
        <>
        <Flex direction='column' gap={2} width='full'>
          <Flex direction="column" gap={2} classNames='bg-primary rounded p-2'>
            <Flex justify='between'>
              <Flex>
                <Text as="h4" size='small'>
                  Editing Worktop
                </Text>
              </Flex>
              <Flex direction='column' gap={1} align='end'>
                <Text as="p" size='small'>
                  {props.worktop.name}
                </Text>
                <Flex gap={1} align='end' justify='end'>
                  <span className="bg-background p-1 h-9 rounded">
                    {color}
                  </span>
                  <div style={{ backgroundColor: color }} className="h-9 w-20 rounded"></div>
                </Flex>
              </Flex>
            </Flex>
            <Flex direction='column' gap={4}>
              <Text as="p" size='small'>
                Change worktop name
              </Text>
              <input type="test" title="Worktop name" value={worktopInputValue} onChange={handleWorktopInputValue}
              className='text-text bg-static rounded py-1 px-2 max-w-[20ch]'/>
            </Flex>
            <Flex direction='column' gap={2}>
              <Text as="p">
                Change worktop's color code
              </Text>
              <ColorPicker onClick={handleWorktopColor} />
              <div className="flex justify-between">
                {worktopColorInput ? (
                  <Text as="p" classNames='flex gap-2'>
                    Color set 
                    <CheckCircleOutline />
                    <span className='bg-background px-1 rounded'>
                      {worktopColorInput}
                    </span>
                  </Text>
                ) : (
                  <Text as="p" classNames='flex gap-2'>
                    No color selected
                    <CancelOutlined />
                  </Text>
                )}
              </div>
            </Flex>
          </Flex>
          <Button text="Save Changes" fullWidth icon={SaveRounded} onClick={handleSaveWorktopChanges} loading={loading} />
        </Flex>
        </>
      )}
    </Flex>
  );
};

export default WorktopsEditor;
