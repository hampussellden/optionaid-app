import React, { useState, useContext } from 'react';
import { CountertopsTwoTone, CountertopsOutlined, AddRounded } from '@mui/icons-material';
import { Worktop, WorktopType } from '../app/types';
import MenuItem from './MenuItem';
import WorktopTypesCreator from './WorktopTypesCreator';
import WorktopsEditor from './WorktopsEditor';
import ItemList from './ItemList';
import WorktopsCreator from './WorktopsCreator';
import Box from './Box';
import LoadingSpinner from './LoadingSpinner';
import { WorktopsContext, WorktopContextType } from '../app/admin/context/WorktopsContext';
type WorktopsProps = {};

const Worktops = (props: WorktopsProps) => {
  const { worktopTypes, worktops } = useContext(WorktopsContext) as WorktopContextType;
  const [creating, setCreating] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [selectedWorktopType, setSelectedWorktopType] = useState<WorktopType | null>(null);
  const [selectedWorktop, setSelectedWorktop] = useState<Worktop | null>(null);

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
        {worktopTypes.length > 0 ? (
          <ItemList>
            {worktopTypes &&
              worktopTypes.map((worktopType) => (
                <div key={worktopType.id}>
                  <MenuItem
                    text={worktopType.make}
                    icon={CountertopsTwoTone}
                    onClick={() => handleSelectworktopType(worktopType)}
                    active={selectedWorktopType?.id === worktopType.id ? true : false}
                  />
                  {worktops && selectedWorktopType?.id == worktopType.id && (
                    <ItemList indent marginTop>
                      {worktops
                        .filter((worktop) => worktop.worktop_type_id === selectedWorktopType.id)
                        .map((worktop) => (
                          <MenuItem
                            key={worktop.id}
                            text={worktop.name}
                            icon={CountertopsOutlined}
                            onClick={() => handleSelectWorktop(worktop)}
                            active={selectedWorktop?.id == worktop.id}
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
                </div>
              ))}
            <MenuItem
              text="New worktop type"
              icon={AddRounded}
              onClick={handleOpenWorktopTypesCreator}
              active={creating && !selectedWorktopType ? true : false}
            />
          </ItemList>
        ) : (
          <LoadingSpinner size="small" />
        )}
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
