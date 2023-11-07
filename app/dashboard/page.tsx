'use client';
import React, { useEffect, useState } from 'react';
import AuthButton from '../_components/AuthButton';
import { createClient } from '@/utils/supabase/client';
import { Apartment } from '../types';
import { LockOpenOutlined, LockOutlined } from '@mui/icons-material';
import MenuItem from '../_components/MenuItem';
import ClientApartmentEditor from '../_components/ClientApartmentEditor';
import ItemList from '../_components/ItemList';
import Box from '../_components/Box';

const Dashboard = () => {
  const supabase = createClient();
  const [apartmentsOnUser, setApartmentsOnUser] = useState<Apartment[]>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);

  const handleSelectApartmentToEdit = (apartment: Apartment) => {
    setEditing(false);
    setSelectedApartment(apartment);
    setEditing(true);
  };

  useEffect(() => {
    const getUserApartments = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: apartments, error } = await supabase
          .from('apartments')
          .select(
            '*,kitchen_types(*,projects(*),fronts(*),worktops(*)),worktop_options(*,worktops(*)),front_options(*,fronts(*))',
          )
          .eq('user_id', user.id);
        if (error) {
          console.log(error);
        }
        if (apartments) {
          setApartmentsOnUser(apartments as Apartment[]);
        }
      }
    };
    getUserApartments();
  }, []);

  return (
    <section className="flex flex-col w-full gap-4 min-h-screen">
      <Box>
        <p className="font-bold text-2xl">Assigned apartments</p>
        <ItemList horizontal>
          {apartmentsOnUser &&
            apartmentsOnUser.map((apartment) => (
              <MenuItem
                text={apartment?.kitchen_types?.projects?.name + ' - ' + apartment.name ?? ''}
                icon={apartment.ready_for_order ? apartment.ready_for_order : LockOpenOutlined}
                onClick={() => handleSelectApartmentToEdit(apartment)}
                active={selectedApartment == apartment ? true : false}
                key={apartment.id}
              />
            ))}
        </ItemList>
      </Box>
      {editing && selectedApartment?.kitchen_types && (
        <ClientApartmentEditor apartment={selectedApartment} kitchenType={selectedApartment.kitchen_types} />
      )}
    </section>
  );
};

export default Dashboard;
