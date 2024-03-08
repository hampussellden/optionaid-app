'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Apartment } from '../types';
import { LockOpenOutlined, LockOutlined, LockRounded } from '@mui/icons-material';
import MenuItem from '../_components/MenuItem';
import ClientApartmentEditor from '../_components/ClientApartmentEditor';
import ItemList from '../_components/ItemList';
import Box from '../_components/Box';
import { dashboardApartmentsAllData } from '@/utils/helpers/supabaseSelect';

const Dashboard = () => {
  const supabase = createClient();
  const [apartmentsOnUser, setApartmentsOnUser] = useState<Apartment[]>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
        const { data: apartments } = await supabase
          .from('apartments')
          .select(dashboardApartmentsAllData)
          .eq('user_id', user.id)
          .order('id', { ascending: false });
        if (apartments) {
          setApartmentsOnUser(apartments as Apartment[]);
          setLoading(false);
        }
      }
    };
    getUserApartments();
  }, [loading]);

  const handleApartmentsLoading = () => {
    setLoading(true);
    setEditing(false);
  };

  return (
    <section className="flex flex-col w-full gap-4 min-h-screen">
      <Box>
        <p className="font-bold text-2xl">Assigned apartments</p>
        <ItemList horizontal>
          {apartmentsOnUser &&
            apartmentsOnUser.map((apartment) => (
              <MenuItem
                text={apartment?.kitchen_types?.projects?.name + ' - ' + apartment.name ?? ''}
                icon={apartment.ready_for_order ? LockRounded : LockOpenOutlined}
                onClick={() => handleSelectApartmentToEdit(apartment)}
                active={selectedApartment?.id == apartment.id ? true : false}
                key={apartment.id}
              />
            ))}
        </ItemList>
      </Box>
      {editing && selectedApartment?.kitchen_types && (
        <ClientApartmentEditor
          apartment={selectedApartment}
          kitchenType={selectedApartment.kitchen_types}
          update={handleApartmentsLoading}
        />
      )}
    </section>
  );
};

export default Dashboard;
