'use client';
import React, { useContext, useEffect, useState } from 'react';
import { KitchenType } from '@/app/types';
import { Apartment, Project } from '@/app/types';
import ApartmentsCreator from './ApartmentsCreator';
import ApartmentEditor from './ApartmentEditor';
import MenuItem from './MenuItem';
import { AddRounded } from '@mui/icons-material';
import ItemList from './ItemList';
import Box from './Box';
import { ProjectsContext, ProjectsContextType } from '../admin/context/ProjectsContext';

export type ApartmentsProps = {
  project: Project;
  kitchenType: KitchenType;
  handleTypeEditorClose: () => void;
  key: number;
};

const Apartments = (props: ApartmentsProps) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const { apartments } = useContext(ProjectsContext) as ProjectsContextType;
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);

  const handleApartmentClick = (apartment: Apartment) => {
    if (selectedApartment?.id === apartment.id) return;
    props.handleTypeEditorClose();
    setSelectedApartment(apartment);
    setEditing(true);
    setCreating(false);
  };

  const handleOpenApartmentCreator = () => {
    setCreating(true);
    setEditing(false);
    setSelectedApartment(null);
    props.handleTypeEditorClose();
  };

  useEffect(() => {
    if (!selectedApartment) return;
    setSelectedApartment(null);
    setEditing(false);
    setCreating(false);
  }, [props.kitchenType]);

  return (
    <>
      <Box>
        <ItemList>
          {apartments &&
            apartments
              .filter((apartment) => apartment.kitchen_type_id === props.kitchenType.id)
              .sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                  return -1;
                } else if (nameA > nameB) {
                  return 1;
                }
                return 0;
              })
              .map((apartment: any) => (
                <MenuItem
                  active={selectedApartment?.id == apartment.id ? true : false}
                  key={apartment.id}
                  onClick={() => handleApartmentClick(apartment)}
                  text={apartment.name}
                />
              ))}
          <MenuItem icon={AddRounded} text="Apartment" active={creating} onClick={handleOpenApartmentCreator} />
        </ItemList>
      </Box>
      {editing && selectedApartment && (
        <ApartmentEditor kitchenType={props.kitchenType} apartment={selectedApartment} project={props.project} />
      )}
      {creating && <ApartmentsCreator kitchenType={props.kitchenType} />}
    </>
  );
};

export default Apartments;
