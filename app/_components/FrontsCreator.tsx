import React, { useState, useContext } from 'react';
import classNames from 'classnames';
import ColorPicker from './ColorPicker';
import { CheckCircleOutline, CancelOutlined, SaveRounded, AddRounded } from '@mui/icons-material';
import { createClient } from '@/utils/supabase/client';
import Button from './Button';
import { CreationMessage, FrontType } from '../types';
import Box from './Box';
import Message from './Message';
import { MessagesContext, MessagesContextType } from '../admin/context/MessagesContext';
type FrontsCreatorProps = {
  frontType: FrontType;
  update: () => void;
};

const FrontsCreator = (props: FrontsCreatorProps) => {
  const supabase = createClient();
  const [frontColorInput, setFrontColorInput] = useState<string | null>(null);
  const [frontNameInput, setFrontNameInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { addMessage } = useContext(MessagesContext) as MessagesContextType;
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
      const { data, error } = await supabase
        .from('fronts')
        .insert([{ name: frontNameInput, color: frontColorInput, front_type_id: props.frontType.id }])
        .select();
      if (error) console.log('error', error);
      if (data) {
        addMessage({ message: 'Front created successfully', type: 'success' });
        setLoading(false);
        props.update();
      }
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
          value={frontNameInput}
          onChange={handleFrontNameInput}
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-lg text-text font-semibold">Change font color code</p>
        <ColorPicker onClick={handleFrontColor} />
        <div>
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
        </div>
      </div>
      <div className="flex flex-row justify-end gap-2 items-center">
        <Button text="Create new front" icon={AddRounded} onClick={handleCreateNewFront} loading={loading} />
      </div>
    </Box>
  );
};

export default FrontsCreator;
