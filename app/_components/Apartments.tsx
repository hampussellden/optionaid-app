'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { KitchenType } from '@/app/types';
import { User, Apartment, Project } from '@/app/types';
import ApartmentsCreator from './ApartmentsCreator';
import classNames from 'classnames';
import ApartmentEditor from './ApartmentEditor';
import MenuItem from './MenuItem';
import { AddRounded } from '@mui/icons-material';
import ItemList from './ItemList';
import Box from './Box';

export type ApartmentsProps = {
  project: Project;
  kitchenType: KitchenType;
  handleTypeEditorClose: () => void;
};

const Apartments = (props: ApartmentsProps) => {
  const supabase = createClient();
  const [editing, setEditing] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const [apartments, setApartments] = useState<Apartment[] | null>(null);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);

  useEffect(() => {
    const fetchAparments = async () => {
      const { data: apartments } = await supabase
        .from('apartments')
        .select('*')
        .eq('kitchen_type_id', props.kitchenType.id)
        .order('id', { ascending: true });
      setApartments(apartments as Apartment[]);
    };
    fetchAparments();
  }, []);

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

  return (
    <>
      <Box>
        <ItemList>
          {apartments &&
            apartments.map((apartment: any) => (
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
