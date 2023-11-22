import React, { useState, useEffect } from 'react';
import { CountertopsTwoTone, CountertopsOutlined, AddRounded } from '@mui/icons-material';
import { createClient } from '@/utils/supabase/client';
import { Worktop, WorktopType } from '../types';
import MenuItem from './MenuItem';
import WorktopTypesCreator from './WorktopTypesCreator';
import WorktopsEditor from './WorktopsEditor';
import ItemList from './ItemList';
import WorktopsCreator from './WorktopsCreator';
import Box from './Box';
import LoadingSpinner from './LoadingSpinner';

const Worktops = () => {
  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(true);
  const [creating, setCreating] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [worktopTypes, setWorktopTypes] = useState<WorktopType[]>([]);
  const [selectedWorktopType, setSelectedWorktopType] = useState<WorktopType | null>(null);
  const [selectedWorktop, setSelectedWorktop] = useState<Worktop | null>(null);

  useEffect(() => {
    const fetchWorktopTypes = async () => {
      const { data: worktopTypes } = await supabase.from('worktop_types').select('*, worktops(*)');
      if (worktopTypes) {
        setWorktopTypes(worktopTypes as WorktopType[]);
        setLoading(false);
        // This will make sure that we rerender the chosen worktop type and worktop if this is a refresh/update fetch
        if (selectedWorktop) {
          worktopTypes.forEach((worktopType) => {
            if (worktopType.id === selectedWorktopType?.id) {
              setSelectedWorktopType(worktopType as WorktopType);
            }
            if (worktopType.worktops) {
              worktopType.worktops.forEach((worktop) => {
                if (worktop.id === selectedWorktop.id) {
                  setSelectedWorktop(worktop as Worktop);
                }
              });
            }
          });
        }
      }
    };
    fetchWorktopTypes();
  }, [loading]);

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
  const handleWorktopLoading = () => {
    setLoading(true);
  };

  return (
    <>
      <Box>
        {!loading && (
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
                  {worktopType.worktops && selectedWorktopType?.id == worktopType.id && (
                    <ItemList indent marginTop>
                      {worktopType.worktops.map((worktop) => (
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
        )}
        {loading && <LoadingSpinner size="small" />}
      </Box>
      {editing && selectedWorktopType && (
        <WorktopsEditor worktopType={selectedWorktopType} worktop={selectedWorktop} update={handleWorktopLoading} />
      )}

      {creating && !selectedWorktopType && <WorktopTypesCreator />}

      {creating && selectedWorktopType && (
        <WorktopsCreator worktopType={selectedWorktopType} update={handleWorktopLoading} />
      )}
      {!loading && !editing && !creating && !selectedWorktopType && (
        <Box grow>
          <p className="text-2xl font-bold text-text">Worktops</p>
          <p className="text-lg font-semibold text-text">Select a worktop type to edit</p>
        </Box>
      )}
      {loading && (
        <Box grow center>
          <LoadingSpinner size="medium" />
        </Box>
      )}
    </>
  );
};

export default Worktops;
