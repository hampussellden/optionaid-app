import React, { useState, useContext } from 'react';
import classNames from 'classnames';
import { createClient } from '@/utils/supabase/client';
import { CreationMessage, Worktop, WorktopType } from '../types';
import ColorPicker from './ColorPicker';
import { CancelOutlined, CheckCircleOutline, SaveRounded } from '@mui/icons-material';
import Button from './Button';
import Message from './Message';
import { MessagesContext, MessagesContextType } from '../admin/context/MessagesContext';

type WorktopsEditorProps = {
  worktopType: WorktopType;
  worktop?: Worktop | null;
  update: () => void;
};

const WorktopsEditor = (props: WorktopsEditorProps) => {
  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [worktopTypeInputValue, setWorktopTypeInputValue] = useState<string>('');
  const [worktopInputValue, setWorktopInputValue] = useState<string>('');
  const [worktopColorInput, setWorktopColorInput] = useState<string | null>(null);
  const { addMessage } = useContext(MessagesContext) as MessagesContextType;
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
    const updateWorktopType = async () => {
      if (worktopTypeInputValue.length < 1) {
        addMessage({ message: 'A worktop type must have a name', type: 'error' });
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('worktop_types')
        .update({ make: worktopTypeInputValue })
        .eq('id', props.worktopType.id)
        .select();
      if (error) {
        addMessage({ message: 'An error occured', type: 'error' });
        setLoading(false);
      }
      if (data) {
        addMessage({ message: 'Worktop type updated successfully', type: 'success' });
        setLoading(false);
        props.update();
      }
    };
    setLoading(true);
    updateWorktopType();
  };
  const handleSaveWorktopChanges = () => {
    const updateWorktop = async () => {
      if (props.worktop?.id == undefined || null) return;
      var worktopName;
      var worktopColor;
      var worktopId = props.worktop?.id;

      worktopInputValue.length < 1 ? (worktopName = props.worktop?.name) : (worktopName = worktopInputValue);

      !worktopColorInput ? (worktopColor = props.worktop?.color) : (worktopColor = worktopColorInput);
      console.log('worktopName' + worktopName);
      const { data, error } = await supabase
        .from('worktops')
        .update({ name: worktopName, color: worktopColor })
        .eq('id', worktopId)
        .select();
      if (error) {
        addMessage({ message: 'An error occured', type: 'error' });
        setLoading(false);
      }
      if (data) {
        addMessage({ message: 'Worktop updated successfully', type: 'success' });
        setLoading(false);
        props.update();
      }
    };
    setLoading(true);
    updateWorktop();
  };

  return (
    <div className="flex flex-col grow bg-primary rounded p-4 gap-4 scroll-smooth scrollbar-thin scrollbar-track-inherit scrollbar-thumb-secondary scrollbar-track-rounded scrollbar-thumb-rounded overflow-y-auto">
      <div className="flex flex-row justify-between">
        <p className="text-2xl text-text font-bold">Editing Worktop Group</p>
        <p className="text-xl font-semibold text-text">{props.worktopType.make}</p>
      </div>
      <div>
        <p className="text-lg text-text font-semibold">Change Front type name</p>
        <input
          type="text"
          value={worktopTypeInputValue}
          onChange={handleWorktopTypeInputValue}
          className="text-text bg-background rounded py-2 px-4 font-semibold"
        />
      </div>
      <div className="ml-auto flex flex-row gap-2">
        <Button text="Save Changes" icon={SaveRounded} onClick={handleSaveWorktopTypeChanges} loading={loading} />
      </div>

      {props.worktop && (
        <>
          <hr className="border-background"></hr>
          <div className="flex flex-row justify-between">
            <p className="text-xl font-bold text-text"> Editing Worktop</p>
            {props.worktop && (
              <p className="text-lg text-text font-semibold">
                {' '}
                {props.worktop.name + ' - '}
                <span className="bg-background p-1 rounded">{props.worktop.color}</span>
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-lg text-text font-semibold">Change Worktop name</p>
              <input
                type="text"
                value={worktopInputValue}
                onChange={handleWorktopInputValue}
                className="text-text bg-background rounded py-2 px-4 font-semibold"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-lg text-text font-semibold">Change font color code</p>
              <ColorPicker onClick={handleWorktopColor} />
              <div>
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
              </div>
            </div>
          </div>
          <div className="ml-auto flex flex-row gap-2">
            <Button text="Save Changes" icon={SaveRounded} onClick={handleSaveWorktopChanges} loading={loading} />
          </div>
        </>
      )}
    </div>
  );
};

export default WorktopsEditor;
