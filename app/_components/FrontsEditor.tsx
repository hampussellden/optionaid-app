import React, { useState } from 'react';
import { CreationMessage, Front } from '../types';
import Button from './Button';
import { CancelOutlined, CheckCircleOutline, SaveRounded } from '@mui/icons-material';
import { createClient } from '@/utils/supabase/client';
import ColorPicker from './ColorPicker';
import classNames from 'classnames';

type FrontsEditorProps = {
  frontType: string;
  front?: Front | null;
};

const FrontsEditor = (props: FrontsEditorProps) => {
  const supabase = createClient();
  const [frontTypeInputValue, setFrontTypeInputValue] = useState<string>('');
  const [frontInputValue, setFrontInputValue] = useState<string>('');
  const [frontColorInput, setFrontColorInput] = useState<string | null>(null);
  const [message, setMessage] = useState<CreationMessage>();
  const [loading, setLoading] = useState<boolean>(false);

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
        setMessage({ message: 'A front type must have a name', type: 'error' });
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('front_types')
        .update({ name: frontTypeInputValue })
        .eq('name', props.frontType)
        .select();
      if (error) console.log('error', error);
      if (data) {
        setMessage({ message: 'Front type updated successfully', type: 'success' });
        setLoading(false);
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
        setMessage({ message: 'An error occured', type: 'error' });
        setLoading(false);
      }
      if (data) {
        setMessage({ message: 'Front updated successfully', type: 'success' });
        setLoading(false);
      }
    };
    setLoading(true);
    updateFront();
  };

  return (
    <div className="flex flex-col bg-primary grow rounded p-4 gap-4 scroll-smooth scrollbar-thin scrollbar-track-inherit scrollbar-thumb-secondary scrollbar-track-rounded scrollbar-thumb-rounded overflow-y-auto">
      <div className="flex flex-row justify-between">
        <p className="text-2xl font-bold text-text">Editing Front Group</p>
        <p className="text-xl font-semibold text-text">{props.frontType}</p>
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
        {message && (
          <p
            className={classNames(
              { 'text-accent': message.type == 'error', 'text-text': message.type == 'success' },
              'text-lg font-semibold p-2 bg-background rounded',
            )}
          >
            {message.message}
          </p>
        )}
        <Button text="Save Changes" icon={SaveRounded} onClick={handleSaveFrontTypeChanges} />
      </div>

      {props.front && (
        <>
          <hr className="border-background"></hr>
          <div className="flex flex-row justify-between">
            <p className="text-xl font-bold text-text"> Editing Front</p>
            {props.front && (
              <p className="text-lg text-text font-semibold">
                {' '}
                {props.front.name + ' - '}
                <span className="bg-background p-1 rounded">{props.front.color}</span>
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
            {message && (
              <p
                className={classNames(
                  { 'text-accent': message.type == 'error', 'text-text': message.type == 'success' },
                  'text-lg font-semibold p-2 bg-background rounded',
                )}
              >
                {message.message}
              </p>
            )}
            <Button text="Save Changes" icon={SaveRounded} onClick={handleSaveFrontChanges} loading={loading} />
          </div>
        </>
      )}
    </div>
  );
};

export default FrontsEditor;
