'use client';
import React, { useState, useEffect, useContext } from 'react';
import { Project, KitchenType } from '@/app/types';
import Apartments from './Apartments';
import KitchenTypesCreator from './KitchenTypesCreator';
import KitchenTypesEditor from './KitchenTypesEditor';
import MenuItem from './MenuItem';
import { AddRounded, KitchenRounded, KitchenTwoTone } from '@mui/icons-material';
import ItemList from './ItemList';
import Box from './Box';
import { ProjectsContext, ProjectsContextType } from '../admin/context/ProjectsContext';

export type KitchenTypesProps = {
  project: Project;
  handleProjectEditorClose: () => void;
  key: number;
};
const KitchenTypes = (props: KitchenTypesProps) => {
  const { kitchenTypes } = useContext(ProjectsContext) as ProjectsContextType;
  const [selectedType, setSelectedType] = useState<KitchenType | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const [apartmentsKey, setApartmentsKey] = useState(0);

  const handleTypeEditorClose = () => {
    setEditing(false);
  };

  const handleKitchenTypeClick = (kitchenType: KitchenType) => {
    if (selectedType?.id === kitchenType.id) {
      setApartmentsKey((prevKey) => prevKey + 1);
      setEditing(true);
      return;
    }
    setEditing(true);
    setCreating(false);
    setSelectedType(kitchenType);
    props.handleProjectEditorClose();
  };
  const handleOpenKitchenTypeCreator = () => {
    setEditing(false);
    setCreating(true);
    setSelectedType(null);
    props.handleProjectEditorClose();
  };

  useEffect(() => {
    if (!selectedType) return;
    setSelectedType(null);
  }, [props.project]);

  return (
    <>
      <Box>
        <ItemList>
          {kitchenTypes &&
            kitchenTypes
              .filter((kitchenType: KitchenType) => kitchenType.project_id === props.project.id)
              .sort((a, b) => {
                let nameA = a.name ?? '';
                let nameB = b.name ?? '';
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > (nameB ?? '')) {
                  return 1;
                }
                return 0;
              })
              .map((kitchenType: any, key: number) => (
                <MenuItem
                  active={selectedType?.id === kitchenType.id ? true : false}
                  key={key}
                  onClick={() => handleKitchenTypeClick(kitchenType)}
                  text={'type ' + kitchenType.name}
                  icon={selectedType?.id === kitchenType.id ? KitchenTwoTone : KitchenRounded}
                />
              ))}
          <MenuItem
            active={creating}
            key={'new'}
            onClick={handleOpenKitchenTypeCreator}
            text={'new type'}
            icon={AddRounded}
          />
        </ItemList>
      </Box>
      {selectedType && (
        <Apartments
          project={props.project}
          kitchenType={selectedType}
          handleTypeEditorClose={handleTypeEditorClose}
          key={apartmentsKey}
        />
      )}
      {editing && selectedType && <KitchenTypesEditor kitchenType={selectedType} project={props.project} />}
      {creating && <KitchenTypesCreator project={props.project} />}
    </>
  );
};

export default KitchenTypes;
