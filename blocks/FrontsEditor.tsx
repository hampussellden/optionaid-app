import React, { useState, useContext } from 'react';
import { Front, FrontType } from '../app/types';
import Button from '../components/Button';
import { CancelOutlined, CheckCircleOutline, SaveRounded } from '@mui/icons-material';
import ColorPicker from '../components/ColorPicker';
import { MessagesContext, MessagesContextType } from '../app/admin/context/MessagesContext';
import { FrontsContext, FrontsContextType } from '../app/admin/context/FrontsContext';
import Flex from '@/Containers/Flex';
import Text from '@/components/Text';

type FrontsEditorProps = {
  frontType: FrontType;
  front?: Front | null;
};

const FrontsEditor = (props: FrontsEditorProps) => {
  const [frontTypeInputValue, setFrontTypeInputValue] = useState<string>('');
  const [frontInputValue, setFrontInputValue] = useState<string>('');
  const [frontColorInput, setFrontColorInput] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { addMessage } = useContext(MessagesContext) as MessagesContextType;
  const { updateFrontType, updateFront } = useContext(FrontsContext) as FrontsContextType;
  const color = props.front?.color;

  const handleFrontTypeInputValue = (e: React.ChangeEvent<any>) => {
    setFrontTypeInputValue(e.target.value);
  };
  const handleFrontInputValue = (e: React.ChangeEvent<any>) => {
    setFrontInputValue(e.target.value);
  };
  const handleFrontColor = (color: string | null) => {
    setFrontColorInput(color);
  };

  const handleSaveFrontTypeChanges = () => {
    const updateFrontTypeContextAndDatabase = async () => {
      if (frontTypeInputValue.length < 1) {
        addMessage({ message: 'A front type must have a name', type: 'error' });
        setLoading(false);
        return;
      }
      const updatedFrontType: FrontType = { id: props.frontType.id, name: frontTypeInputValue };
      addMessage(await updateFrontType(updatedFrontType));
      setLoading(false);
    };
    setLoading(true);
    updateFrontTypeContextAndDatabase();
  };
  const handleSaveFrontChanges = () => {
    const updateFrontContextAndDatabase = async () => {
      if (props.front?.id == undefined || null) return;
      if (!frontColorInput) {
        addMessage({ message: 'A front must have a color', type: 'error' });
        setLoading(false);
        return;
      }
      const color = frontColorInput;
      const id = props.front?.id;
      const name = frontInputValue.length < 1 ? props.front?.name : frontInputValue;

      const updatedFront: Front = {
        id: id,
        name: name,
        front_type_id: props.frontType.id,
        color: color,
      };
      addMessage(await updateFront(updatedFront));
      setLoading(false);
    };
    setLoading(true);
    updateFrontContextAndDatabase();
  };

  return (
    <Flex direction="column" align="center" gap={4}>
      <Flex direction="column" gap={2}>
        <Flex direction="column" align="center" gap={2} classNames="bg-primary rounded p-2">
          <Flex justify="between">
            <Text as="h4" size="small">
              Editing Front Group
            </Text>
            <Text as="p" size="small">
              {props.frontType.name}
            </Text>
          </Flex>
          <Flex direction="column" align="start" classNames="w-full">
            <Text as="p">Change front type name</Text>
            <input
              type="text"
              title="Front type name"
              value={frontTypeInputValue}
              onChange={handleFrontTypeInputValue}
              className="text-text bg-static rounded py-1 px-2 max-w-[20ch]"
            />
          </Flex>
        </Flex>
        <Button fullWidth text="Save Changes" icon={SaveRounded} onClick={handleSaveFrontTypeChanges} />
      </Flex>
      {props.front && (
        <>
          <Flex direction="column" gap={2}>
            <Flex direction="column" gap={2} classNames="bg-primary rounded p-2">
              <Flex justify="between">
                <Flex>
                  <Text as="h4" size="small">
                    Editing Front
                  </Text>
                </Flex>
                <Flex direction="column" gap={1} align="end">
                  <Text as="p" size="small">
                    {props.front.name}
                  </Text>
                  <Flex gap={1} align="end" justify="end">
                    <span className="bg-background p-1 h-9 rounded">{color}</span>
                    <div style={{ backgroundColor: color }} className="h-9 w-20 rounded"></div>
                  </Flex>
                </Flex>
              </Flex>
              <Flex direction="column" gap={4}>
                <Text as="p" size="small">
                  Change Front name
                </Text>
                <input
                  type="text"
                  title="Front name"
                  value={frontInputValue}
                  onChange={handleFrontInputValue}
                  className="text-text bg-static rounded py-1 px-2 max-w-[20ch]"
                />
              </Flex>
              <Flex direction="column" gap={2}>
                <Text as="p">Change front's color code</Text>
                <ColorPicker onClick={handleFrontColor} />
                <div className="flex justify-between">
                  {frontColorInput ? (
                    <Text as="p" classNames="flex gap-2">
                      Color set
                      <CheckCircleOutline />
                      <span className="bg-background px-1 rounded">{frontColorInput}</span>
                    </Text>
                  ) : (
                    <Text as="p">
                      No color selected
                      <CancelOutlined />
                    </Text>
                  )}
                </div>
              </Flex>
            </Flex>
            <Button
              text="Save Changes"
              fullWidth
              icon={SaveRounded}
              onClick={handleSaveFrontChanges}
              loading={loading}
            />
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default FrontsEditor;
