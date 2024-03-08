import React, { useState, useContext } from 'react';
import ColorPicker from './ColorPicker';
import { CheckCircleOutline, CancelOutlined, AddRounded } from '@mui/icons-material';
import Button from './Button';
import { Front, FrontType, FrontWithoutId } from '../app/types';
import Box from './Box';
import { MessagesContext, MessagesContextType } from '../app/admin/context/MessagesContext';
import { FrontsContext, FrontsContextType } from '../app/admin/context/FrontsContext';
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
    <Box grow primary>
      <div>
        <p className="text-2xl font-bold text-text">Creating front on type</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl font-semibold text-text">Front Name</p>
        <input
          className="text-text bg-background rounded py-2 px-4 font-semibold"
          type="text"
          aria-label="Front name"
          value={frontNameInput}
          onChange={handleFrontNameInput}
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
          <Button text="Create new front" icon={AddRounded} onClick={handleCreateNewFront} loading={loading} />
        </div>
      </div>
    </Box>
  );
};

export default FrontsCreator;
