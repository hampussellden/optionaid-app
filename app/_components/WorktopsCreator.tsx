import React, { useState, useContext } from 'react';
import ColorPicker from './ColorPicker';
import { CheckCircleOutline, CancelOutlined, SaveRounded, AddRounded } from '@mui/icons-material';
import { createClient } from '@/utils/supabase/client';
import Button from './Button';
import { WorktopType } from '../types';
import Box from './Box';
import { MessagesContext, MessagesContextType } from '../admin/context/MessagesContext';
type WorktopsCreatorProps = {
  worktopType: WorktopType | null;
  update: () => void;
};

const WorktopsCreator = (props: WorktopsCreatorProps) => {
  const supabase = createClient();
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
      const { data, error } = await supabase
        .from('worktops')
        .insert([{ name: worktopNameInput, color: worktopColorInput, worktop_type_id: props.worktopType?.id }])
        .select();
      if (error) {
        addMessage({ message: 'Error creating worktop', type: 'error' });
        setLoading(false);
      }
      if (data) {
        addMessage({ message: 'Worktop created successfully', type: 'success' });
        setLoading(false);
        props.update();
      }
    };
    setLoading(true);
    createWorktop();
  };

  return (
    <Box grow primary>
      <div className="flex justify-between">
        <p className="text-2xl font-bold text-text">Creating worktop on type</p>
        <p className="text-xl font-semibold text-text">{props.worktopType?.make}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl font-semibold text-text">Worktop Name</p>
        <input
          className="text-text bg-background rounded py-2 px-4 font-semibold"
          type="text"
          title="Worktop name"
          value={worktopNameInput}
          onChange={handleWorktopNameInput}
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
      <div className="flex flex-row justify-end gap-2 items-center">
        <Button text="Create new worktop" icon={AddRounded} onClick={handleCreateNewWorktop} loading={loading} />
      </div>
    </Box>
  );
};

export default WorktopsCreator;
