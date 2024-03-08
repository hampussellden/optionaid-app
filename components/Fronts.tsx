import React, { useState, useContext } from 'react';
import FrontsCreator from './FrontsCreator';
import { Front, FrontType } from '../app/types';
import { AddRounded, SensorDoorOutlined, SensorDoorTwoTone } from '@mui/icons-material';
import MenuItem from './MenuItem';
import FrontsEditor from './FrontsEditor';
import FrontTypesCreator from './FrontTypesCreator';
import ItemList from './ItemList';
import Box from './Box';
import LoadingSpinner from './LoadingSpinner';
import { FrontsContext, FrontsContextType } from '../app/admin/context/FrontsContext';
type FrontsProps = {};

const Fronts = (props: FrontsProps) => {
  const { frontTypes, fronts } = useContext(FrontsContext) as FrontsContextType;
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [selectedFrontType, setSelectedFrontType] = useState<FrontType | null>(null);
  const [selectedFront, setSelectedFront] = useState<Front | null>(null);

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

  return (
    <>
      <Box>
        {frontTypes.length > 0 ? (
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
                  {fronts && selectedFrontType?.id === frontType.id && (
                    <ItemList indent marginTop>
                      {fronts
                        .filter((front) => front.front_type_id === selectedFrontType.id)
                        .map((front) => (
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
        ) : (
          <LoadingSpinner size="small" />
        )}
      </Box>
      {editing && selectedFrontType && <FrontsEditor frontType={selectedFrontType} front={selectedFront} />}
      {creating && selectedFrontType && <FrontsCreator frontType={selectedFrontType} />}
      {creating && !selectedFrontType && <FrontTypesCreator />}
      {!editing && !creating && !selectedFrontType && (
        <Box grow>
          <p className="text-2xl font-bold text-text">Fronts</p>
          <p className="text-lg font-semibold text-text">Select a front type to edit</p>
        </Box>
      )}
    </>
  );
};

export default Fronts;
