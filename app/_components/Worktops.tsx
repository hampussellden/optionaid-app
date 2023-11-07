import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { CountertopsTwoTone, CountertopsOutlined, AddRounded } from '@mui/icons-material';
import { createClient } from '@/utils/supabase/client';
import { Worktop, WorktopType } from '../types';
import MenuItem from './MenuItem';
import WorktopTypesCreator from './WorktopTypesCreator';
import WorktopsEditor from './WorktopsEditor';
import ItemList from './ItemList';
import WorktopsCreator from './WorktopsCreator';
import Box from './Box';
type WorktopsProps = {};

const Worktops = (props: WorktopsProps) => {
  const supabase = createClient();
  const [creating, setCreating] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [worktopTypes, setWorktopTypes] = useState<WorktopType[]>([]);
  const [selectedWorktopType, setSelectedWorktopType] = useState<WorktopType | null>(null);
  const [selectedWorktop, setSelectedWorktop] = useState<Worktop | null>(null);

  useEffect(() => {
    const fetchWorktopTypes = async () => {
      const { data: worktopTypes } = await supabase.from('worktop_types').select('*, worktops(*)');
      if (worktopTypes) {
        console.log(worktopTypes);
        setWorktopTypes(worktopTypes as WorktopType[]);
      }
    };
    fetchWorktopTypes();
  }, []);

  const handleSelectworktopType = (worktopType: WorktopType) => {
    setSelectedWorktop(null);
    if (selectedWorktopType === worktopType) return;
    setSelectedWorktopType(worktopType);
    setCreating(false);
    setEditing(true);
  };
  const handleSelectWorktop = (worktop: Worktop) => {
    if (selectedWorktop === worktop) return;
    setSelectedWorktop(worktop);
    setCreating(false);
    setEditing(true);
  };

  const handleOpenWorktopTypesCreator = () => {
    setSelectedWorktopType(null);
    setCreating(true);
    setEditing(false);
  };

  const handleOpenWorktopCreator = () => {
    if (creating) return;
    setCreating(true);
    setEditing(false);
    setSelectedWorktop(null);
  };

  return (
    <>
      <Box>
        <ItemList>
          {worktopTypes &&
            worktopTypes.map((worktopType) => (
              <>
                <MenuItem
                  key={worktopType.id}
                  text={worktopType.make}
                  icon={CountertopsTwoTone}
                  onClick={() => handleSelectworktopType(worktopType)}
                  active={selectedWorktopType === worktopType ? true : false}
                />
                {worktopType.worktops && selectedWorktopType == worktopType && (
                  <ItemList indent>
                    {worktopType.worktops.map((worktop) => (
                      <MenuItem
                        key={worktop.id}
                        text={worktop.name}
                        icon={CountertopsOutlined}
                        onClick={() => handleSelectWorktop(worktop)}
                        active={selectedWorktop == worktop}
                      />
                    ))}
                    <MenuItem
                      icon={AddRounded}
                      text="Create Worktop"
                      onClick={handleOpenWorktopCreator}
                      active={creating && selectedWorktopType === worktopType ? true : false}
                    />
                  </ItemList>
                )}
              </>
            ))}
          <MenuItem
            text="New worktop type"
            icon={AddRounded}
            onClick={handleOpenWorktopTypesCreator}
            active={creating && !selectedWorktopType ? true : false}
          />
        </ItemList>
      </Box>
      {editing && selectedWorktopType && <WorktopsEditor worktopType={selectedWorktopType} worktop={selectedWorktop} />}

      {creating && !selectedWorktopType && <WorktopTypesCreator />}

      {creating && selectedWorktopType && <WorktopsCreator worktopType={selectedWorktopType} />}
      {!editing && !creating && !selectedWorktopType && (
        <Box grow>
          <p className="text-2xl font-bold text-text">Worktops</p>
          <p className="text-lg font-semibold text-text">Select a worktop type to edit</p>
        </Box>
      )}
    </>
  );
};

export default Worktops;
