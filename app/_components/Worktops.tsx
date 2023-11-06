import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { CountertopsTwoTone, CountertopsOutlined, AddRounded } from '@mui/icons-material';
import { createClient } from '@/utils/supabase/client';
import { Worktop } from '../types';
import MenuItem from './MenuItem';
import WorktopTypesCreator from './WorktopTypesCreator';
import WorktopsEditor from './WorktopsEditor';
type WorktopsProps = {
    
}

type GroupedWorktops = { [key: string]: Worktop[] };

const Worktops = (props: WorktopsProps) => {
  const supabase = createClient();
    const [creating, setCreating] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [worktops, setWorktops] = useState<Worktop[]>([]);
    const [sortedWorktops, setSortedWorktops] = useState<GroupedWorktops | null>(null);
    const [selectedWorktopType, setSelectedWorktopType] = useState<string | null>(null);
    const [selectedWorktop, setSelectedWorktop] = useState<Worktop | null>(null);    

    const groupWorktopsByType = (worktops: Worktop[]): GroupedWorktops => {
      const groupedWorktops: GroupedWorktops = {};
      worktops.forEach((worktop) => {
        const typeName = worktop.worktop_types.make;
        if (!groupedWorktops[typeName]) {
          groupedWorktops[typeName] = [];
        }
        groupedWorktops[typeName].push(worktop);
      });
      return groupedWorktops;
    };

    useEffect(() => {
      setSortedWorktops(groupWorktopsByType(worktops));
    },[worktops]);

    useEffect(() => {
      const fetchWorktops = async () => {
          const { data: worktops } = await supabase.from('worktops').select('*,worktop_types(*)');
          if (worktops) {
            setWorktops(worktops as Worktop[]);
            console.log(worktops)
          }
      }
      fetchWorktops();
    },[]);

    const handleSelectworktopType = (worktopType : string) => {
      setSelectedWorktop(null);
      if (selectedWorktopType === worktopType) return
      setSelectedWorktopType(worktopType);
      setCreating(false);
      setEditing(true);
    }
    const handleSelectWorktop = (worktop : Worktop) => {
      if (selectedWorktop === worktop) return
      setSelectedWorktop(worktop);
      setCreating(false);
      setEditing(true);
    }
  
    const handleOpenWorktopTypesCreator = () => {
      setSelectedWorktopType(null);
      setCreating(true);
      setEditing(false);
    }

    return (
        <>
      <ul className='bg-static rounded p-2'>
        {sortedWorktops && Object.keys(sortedWorktops).map((typeName) => (
          <>
            <MenuItem text={typeName} icon={CountertopsTwoTone} active={selectedWorktopType === typeName ? true:false} onClick={() => handleSelectworktopType(typeName)}/>
              <ul className='ml-4 flex flex-col gap-2 mt-2'>                
              {selectedWorktopType === typeName && sortedWorktops[typeName].map((worktop) => (
                <MenuItem key={worktop.id} text={worktop.name} icon={CountertopsOutlined} onClick={() => handleSelectWorktop(worktop)} active={selectedWorktop == worktop}/>
                ))}
              </ul>
          </>
        ))}
        <MenuItem text='Create Worktop' icon={AddRounded} onClick={handleOpenWorktopTypesCreator} active={creating && !selectedWorktopType ? true: false}/>
      </ul>

      {editing && selectedWorktopType && (
        <WorktopsEditor worktopType={selectedWorktopType} worktop={selectedWorktop}/>
      )}

      {creating  && !selectedWorktopType && (
        <WorktopTypesCreator />
      )}

      {creating && selectedWorktopType && (
        <div></div>
      )}


      {!editing && !creating && !selectedWorktopType && (
        <div className='flex flex-col bg-static rounded p-4 gap-4 grow'>
          <p className='text-2xl font-bold text-text'>Worktops</p>
          <p className='text-lg font-semibold text-text'>Select a worktop type to edit</p>
        </div>
      )}
    </>
    );
};

export default Worktops;