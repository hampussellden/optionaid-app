import React, { useEffect, useState } from 'react';
import FrontsCreator from './FrontsCreator';
import { createClient } from '@/utils/supabase/client';
import { Front, FrontType } from '../types';
import { AddRounded, SensorDoorOutlined, SensorDoorTwoTone } from '@mui/icons-material';
import MenuItem from './MenuItem';
import FrontsEditor from './FrontsEditor';
import FrontTypesCreator from './FrontTypesCreator';
import ItemList from './ItemList';
import Box from './Box';
type FrontsProps = {};

const Fronts = (props: FrontsProps) => {
  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(true);
  const [frontTypes, setFrontTypes] = useState<FrontType[] | null>([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [selectedFrontType, setSelectedFrontType] = useState<FrontType | null>(null);
  const [selectedFront, setSelectedFront] = useState<Front | null>(null);

  useEffect(() => {
    const fetchFrontTypes = async () => {
      const { data: frontTypes } = await supabase.from('front_types').select('*, fronts(*)');
      if (frontTypes) {
        setFrontTypes(frontTypes as FrontType[]);
        setLoading(false);
      }
    };
    fetchFrontTypes();
  }, [loading]);

  const handleSelectFrontType = (frontType: FrontType) => {
    setSelectedFront(null);
    if (selectedFrontType === frontType) return;
    setSelectedFrontType(frontType);
    setCreating(false);
    setEditing(true);
  };
  const handleSelectFront = (front: Front) => {
    if (selectedFront === front) return;
    setSelectedFront(front);
    setCreating(false);
    setEditing(true);
  };

  const handleOpenFrontTypeCreator = () => {
    if (creating && !selectedFrontType == null) return;
    setSelectedFrontType(null);
    setCreating(true);
    setEditing(false);
  };
  const handleOpenFrontCreator = () => {
    if (creating) return;
    setCreating(true);
    setEditing(false);
    setSelectedFront(null);
  };
  const handleFrontsLoading = () => {
    setLoading(true);
  };

  return (
    <>
      <Box>
        {!loading && (
          <ItemList>
            {frontTypes &&
              frontTypes.map((frontType) => (
                <div key={frontType.id}>
                  <MenuItem
                    text={frontType.name}
                    icon={SensorDoorTwoTone}
                    active={selectedFrontType?.id === frontType.id ? true : false}
                    onClick={() => handleSelectFrontType(frontType)}
                  />
                  {frontType.fronts && selectedFrontType?.id === frontType.id && (
                    <ItemList indent marginTop>
                      {frontType.fronts.map((front) => (
                        <MenuItem
                          key={front.id}
                          text={front.name}
                          icon={SensorDoorOutlined}
                          onClick={() => handleSelectFront(front)}
                          active={selectedFront?.id === front.id ? true : false}
                        />
                      ))}
                      <MenuItem
                        icon={AddRounded}
                        text="Create Front"
                        onClick={handleOpenFrontCreator}
                        active={creating && selectedFrontType === frontType ? true : false}
                      />
                    </ItemList>
                  )}
                </div>
              ))}
            <MenuItem
              text="New front type"
              icon={AddRounded}
              onClick={handleOpenFrontTypeCreator}
              active={creating && !selectedFrontType ? true : false}
            />
          </ItemList>
        )}
      </Box>
      {!loading && editing && selectedFrontType && (
        <FrontsEditor frontType={selectedFrontType} front={selectedFront} update={handleFrontsLoading} />
      )}
      {!loading && creating && selectedFrontType && (
        <FrontsCreator frontType={selectedFrontType} update={handleFrontsLoading} />
      )}
      {!loading && creating && !selectedFrontType && <FrontTypesCreator update={handleFrontsLoading} />}
      {!loading && !editing && !creating && !selectedFrontType && (
        <Box grow>
          <p className="text-2xl font-bold text-text">Fronts</p>
          <p className="text-lg font-semibold text-text">Select a front type to edit</p>
        </Box>
      )}
    </>
  );
};

export default Fronts;
