import React, { useState, useContext } from 'react';
import { Front, FrontType } from '../types';
import Button from './Button';
import { CancelOutlined, CheckCircleOutline, SaveRounded } from '@mui/icons-material';
import ColorPicker from './ColorPicker';
import { MessagesContext, MessagesContextType } from '../admin/context/MessagesContext';
import { FrontsContext, FrontsContextType } from '../admin/context/FrontsContext';
import Box from './Box';

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
    <Box primary grow>
      <div className="flex flex-row justify-between">
        <p className="text-2xl font-bold text-text">Editing Front Group</p>
        <p className="text-xl font-semibold text-text">{props.frontType.name}</p>
      </div>

      <div>
        <p className="text-lg text-text font-semibold">Change Front type name</p>
        <input
          type="text"
          title="Front type name"
          value={frontTypeInputValue}
          onChange={handleFrontTypeInputValue}
          className="text-text bg-background rounded py-2 px-4 font-semibold"
        />
      </div>
      <div className="ml-auto mt-auto flex flex-row gap-2">
        <Button text="Save Changes" icon={SaveRounded} onClick={handleSaveFrontTypeChanges} />
      </div>

      {props.front && (
        <>
          <hr className="border-background"></hr>
          <div className="flex flex-row justify-between">
            <p className="text-xl font-bold text-text"> Editing Front</p>
            {props.front && (
              <p className="text-lg text-text font-semibold flex gap-2 items-center">
                {' '}
                {props.front.name + ' - '}
                <span className="bg-background p-1 rounded">{color}</span>
                <div style={{ backgroundColor: color }} className="h-9 w-20 rounded"></div>
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-lg text-text font-semibold">Change Front name</p>
              <input
                type="text"
                title="Front name"
                value={frontInputValue}
                onChange={handleFrontInputValue}
                className="text-text bg-background rounded py-2 px-4 font-semibold"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-lg text-text font-semibold">Change font color code</p>
              <ColorPicker onClick={handleFrontColor} />
              <div className="flex justify-between">
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
                <Button text="Save Changes" icon={SaveRounded} onClick={handleSaveFrontChanges} loading={loading} />
              </div>
            </div>
          </div>
        </>
      )}
    </Box>
  );
};

export default FrontsEditor;
