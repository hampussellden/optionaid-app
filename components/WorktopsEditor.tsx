import React, { useState, useContext } from 'react';
import { Worktop, WorktopType } from '../app/types';
import ColorPicker from './ColorPicker';
import { CancelOutlined, CheckCircleOutline, SaveRounded } from '@mui/icons-material';
import Button from './Button';
import { MessagesContext, MessagesContextType } from '../app/admin/context/MessagesContext';
import { WorktopsContext, WorktopContextType } from '../app/admin/context/WorktopsContext';
import Box from './Box';

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
    <Box grow primary>
      <div className="flex flex-row justify-between">
        <p className="text-2xl text-text font-bold">Editing Worktop Group</p>
        <p className="text-xl font-semibold text-text">{props.worktopType.make}</p>
      </div>
      <div>
        <p className="text-lg text-text font-semibold">Change Front type name</p>
        <input
          type="text"
          title="Worktop type name"
          value={worktopTypeInputValue}
          onChange={handleWorktopTypeInputValue}
          className="text-text bg-background rounded py-2 px-4 font-semibold"
        />
      </div>
      <div className="ml-auto mt-auto flex flex-row gap-2">
        <Button text="Save Changes" icon={SaveRounded} onClick={handleSaveWorktopTypeChanges} loading={loading} />
      </div>

      {props.worktop && (
        <>
          <hr className="border-background"></hr>
          <div className="flex flex-row justify-between">
            <p className="text-xl font-bold text-text"> Editing Worktop</p>
            {props.worktop && (
              <p className="text-lg text-text font-semibold flex gap-2 items-center">
                {' '}
                {props.worktop.name + ' - '}
                <span className="bg-background p-1 rounded">{props.worktop.color}</span>
                <div style={{ backgroundColor: color }} className="h-9 w-20 rounded"></div>
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-lg text-text font-semibold">Change Worktop name</p>
              <input
                type="text"
                title="Worktop name"
                value={worktopInputValue}
                onChange={handleWorktopInputValue}
                className="text-text bg-background rounded py-2 px-4 font-semibold"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-lg text-text font-semibold">Change font color code</p>
              <ColorPicker onClick={handleWorktopColor} />
              <div className="flex justify-between">
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
                <Button text="Save Changes" icon={SaveRounded} onClick={handleSaveWorktopChanges} loading={loading} />
              </div>
            </div>
          </div>
        </>
      )}
    </Box>
  );
};

export default WorktopsEditor;
