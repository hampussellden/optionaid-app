import React, { useState, useContext } from 'react';
import { Front, FrontType } from '../types';
import Button from './Button';
import { CancelOutlined, CheckCircleOutline, SaveRounded } from '@mui/icons-material';
import { createClient } from '@/utils/supabase/client';
import ColorPicker from './ColorPicker';
import { MessagesContext, MessagesContextType } from '../admin/context/MessagesContext';
import Box from './Box';

type FrontsEditorProps = {
  frontType: FrontType;
  front?: Front | null;
  update: () => void;
};

const FrontsEditor = (props: FrontsEditorProps) => {
  const supabase = createClient();
  const [frontTypeInputValue, setFrontTypeInputValue] = useState<string>('');
  const [frontInputValue, setFrontInputValue] = useState<string>('');
  const [frontColorInput, setFrontColorInput] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { addMessage } = useContext(MessagesContext) as MessagesContextType;
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
    const updateFrontType = async () => {
      if (frontTypeInputValue.length < 1) {
        addMessage({ message: 'A front type must have a name', type: 'error' });
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('front_types')
        .update({ name: frontTypeInputValue })
        .eq('name', props.frontType)
        .select();
      if (error) {
        addMessage({ message: 'Error updating front type', type: 'error' });
        setLoading(false);
      }
      if (data) {
        addMessage({ message: 'Front type updated successfully', type: 'success' });
        setLoading(false);
        props.update();
      }
    };
    setLoading(true);
    updateFrontType();
  };
  const handleSaveFrontChanges = () => {
    const updateFront = async () => {
      if (props.front?.id == undefined || null) return;
      var frontName;
      var frontColor;
      var frontId = props.front?.id;

      frontInputValue.length < 1 ? (frontName = props.front?.name) : (frontName = frontInputValue);

      !frontColorInput ? (frontColor = props.front?.color) : (frontColor = frontColorInput);

      const { data, error } = await supabase
        .from('fronts')
        .update({ name: frontName, color: frontColor })
        .eq('id', frontId)
        .select();
      if (error) {
        addMessage({ message: 'An error occured', type: 'error' });
        setLoading(false);
      }
      if (data) {
        addMessage({ message: 'Front updated successfully', type: 'success' });
        setLoading(false);
        props.update();
      }
    };
    setLoading(true);
    updateFront();
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
          value={frontTypeInputValue}
          onChange={handleFrontTypeInputValue}
          className="text-text bg-background rounded py-2 px-4 font-semibold"
        />
      </div>
      <div className="ml-auto flex flex-row gap-2">
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
                value={frontInputValue}
                onChange={handleFrontInputValue}
                className="text-text bg-background rounded py-2 px-4 font-semibold"
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
          </div>
          <div className="ml-auto flex flex-row gap-2">
            <Button text="Save Changes" icon={SaveRounded} onClick={handleSaveFrontChanges} loading={loading} />
          </div>
        </>
      )}
    </Box>
  );
};

export default FrontsEditor;
