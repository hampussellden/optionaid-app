import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import FrontsCreator from './FrontsCreator';
import { createClient } from '@/utils/supabase/client';
import { Front, FrontType } from '../types';
import { AddRounded, SensorDoorOutlined, SensorDoorTwoTone } from '@mui/icons-material';
import MenuItem from './MenuItem';
import FrontsEditor from './FrontsEditor';
import FrontTypesCreator from './FrontTypesCreator';
type FrontsProps = {
    
}
type GroupedFronts = { 
  [key: string]: Front[] 
};


const Fronts = (props: FrontsProps) => {
  const supabase = createClient();
  const [fronts, setFronts] = useState<Front[] | null>([]);  
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [sortedFronts, setSortedFronts] = useState<GroupedFronts | null>(null);
  const [selectedFrontType, setSelectedFrontType] = useState<string | null>(null);
  const [selectedFront, setSelectedFront] = useState<Front | null>(null);
  const groupFrontsByType = () => {
    const groupedFronts: GroupedFronts = {};
    fronts?.forEach((front: any) => {
        if (!groupedFronts[front.front_types.name]) {
            groupedFronts[front.front_types.name] = [];
        }
        groupedFronts[front.front_types.name].push(front);
    });
    return groupedFronts;
  }

  useEffect(() => {
    setSortedFronts(groupFrontsByType());
  },[fronts]);

  useEffect(() => {
      const fetchFronts = async () => {
          const { data: fronts } = await supabase.from('fronts').select('*, front_types(*)');
          if (fronts) setFronts(fronts as Front[]);
      }
      fetchFronts();
  },[]);

  const handleSelectFrontType = (frontTypeName : string) => {
    setSelectedFront(null);
    if (selectedFrontType === frontTypeName) return
    setSelectedFrontType(frontTypeName);
    setCreating(false);
    setEditing(true);
  }
  const handleSelectFront = (front : Front) => {
    if (selectedFront === front) return
    setSelectedFront(front);
    setCreating(false);
    setEditing(true);
  }

  const handleOpenFrontTypeCreator = () => {
    if (creating && !selectedFrontType == null) return
    setSelectedFrontType(null);
    setCreating(true);
    setEditing(false);
  }
  const handleOpenFrontCreator = () => {
    if (creating) return
    setCreating(true);
    setEditing(false);
    setSelectedFront(null);
  }
  const getFrontTypeIdByFrontTypeName = (frontTypeName: string) => {
    const frontType = fronts?.find((front) => front.front_types.name === frontTypeName);
    return frontType?.front_types.id;
  }
  return (
    <>
      <ul className='bg-static rounded p-2'>
        {sortedFronts && Object.keys(sortedFronts).map((frontTypeName) => (
          <>
            <MenuItem text={frontTypeName} icon={SensorDoorTwoTone} active={selectedFrontType === frontTypeName ? true:false} onClick={() => handleSelectFrontType(frontTypeName)}/>
              <ul className='ml-4 flex flex-col gap-2 mt-2'>                
              {selectedFrontType === frontTypeName && sortedFronts[frontTypeName].map((front) => (
                <MenuItem key={front.id} text={front.name} icon={SensorDoorOutlined} onClick={() => handleSelectFront(front)} active={selectedFront === front ? true:false}/>
                ))}
                {selectedFrontType === frontTypeName && (
                <MenuItem icon={AddRounded} text='Create Front' onClick={handleOpenFrontCreator} active={creating && selectedFrontType === frontTypeName ? true: false}/>
                )}
              </ul>
          </>
        ))}
        <MenuItem text='New front type' icon={AddRounded} onClick={handleOpenFrontTypeCreator} active={creating && !selectedFrontType ? true: false}/>
      </ul>
      {editing && selectedFrontType && (
        <FrontsEditor frontType={selectedFrontType} front={selectedFront} />
      )}
      {creating && selectedFrontType && (
        <FrontsCreator frontTypeId={getFrontTypeIdByFrontTypeName(selectedFrontType)}/>
      )}
      {creating && !selectedFrontType && (
        <FrontTypesCreator />
      )}
      {!editing && !creating && !selectedFrontType && (
        <div className='flex flex-col bg-static rounded p-4 gap-4 grow'>
          <p className='text-2xl font-bold text-text'>Fronts</p>
          <p className='text-lg font-semibold text-text'>Select a front type to edit</p>
        </div>
      )}
    </>
  );
};

export default Fronts;