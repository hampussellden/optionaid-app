'use client'
import React, {useEffect, useState} from 'react';
import AuthButton from '../_components/AuthButton';
import { createClient } from '@/utils/supabase/client';
import { Apartment } from '../types';
import { LockOpenOutlined, LockOutlined } from '@mui/icons-material'
import MenuItem from '../_components/MenuItem';
import ClientApartmentEditor from '../_components/ClientApartmentEditor';

const Dashboard = () => {
  const supabase = createClient();
  const [apartmentsOnUser, setApartmentsOnUser] = useState<Apartment[]>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);

  const handleSelectApartmentToEdit = (apartment: Apartment) => {
    setEditing(false)
    setSelectedApartment(apartment)
    setEditing(true)
  }

  useEffect(() => {
    const getUserApartments = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: apartments, error } = await supabase
          .from('apartments')
          .select('*,kitchen_types(*,projects(*),fronts(*),worktops(*))')
          .eq('user_id', user.id)
        if (error) {
          console.log(error)
        } 
        if (apartments) {
          setApartmentsOnUser(apartments as Apartment[])
        }
      }
    }
    getUserApartments()
  }, [])

    return(
        <section className='flex flex-col w-full gap-4 min-h-screen'>
          <nav className='flex flex-col gap-4 p-4 rounded bg-primary'>
            <p className='font-bold text-2xl'>Assigned apartments</p>
            <ul className='flex flex-row gap-2 bg-secondary p-2 rounded'>
            {apartmentsOnUser && apartmentsOnUser.map((apartment) => (
                <MenuItem text={apartment?.kitchen_types?.projects?.name + ' - ' + apartment.name ?? ''} icon={apartment.ready_for_order ? apartment.ready_for_order : LockOpenOutlined } onClick={() => handleSelectApartmentToEdit(apartment)} active={selectedApartment == apartment ? true: false}/>
              ))}
          </ul>
          </nav>
            { editing && selectedApartment?.kitchen_types && (
              <ClientApartmentEditor apartment={selectedApartment} kitchenType={selectedApartment.kitchen_types}/>
            )}
        </section>
        )
};
        
export default Dashboard;