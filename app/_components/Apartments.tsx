'use client'
import React, {useEffect, useState} from 'react';
import { createClient } from '@/utils/supabase/client';
import { KitchenType } from '@/app/types';
import {User, Apartment} from '@/app/types';
import ApartmentsCreator from './ApartmentsCreator';
import classNames from 'classnames';
import ApartmentEditor from './ApartmentEditor';

export type ApartmentsProps = {
  kitchenType: KitchenType;
  handleTypeEditorClose: () => void
}

const Apartments = (props:ApartmentsProps) => {
  const supabase = createClient();
  const [editing, setEditing] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const [apartments,setApartments] = useState<Apartment[] | null>(null)
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null)

  useEffect(() => {
    const fetchAparments = async () => {
      const { data: apartments } = await supabase.from('apartments').select('*').eq('kitchen_type_id', props.kitchenType.id).order('id', { ascending: true });
      setApartments(apartments as Apartment[])
    }
    fetchAparments();
  },[]);

  const handleApartmentClick = (apartment:Apartment) => {
    props.handleTypeEditorClose()
    setSelectedApartment(apartment)
    setEditing(true)
    setCreating(false)
  }

  const handleOpenApartmentCreator = () => {
    setCreating(true)
    setEditing(false)
    setSelectedApartment(null)
    props.handleTypeEditorClose()
  }
  
  return (
    <>
      <div className='flex flex-col min-w-fit items-start bg-secondary rounded p-4 gap-1 max-h-96 scroll-smooth overflow-y-auto scrollbar-thin scrollbar-track-secondary scrollbar-thumb-secondaryHover'>
          { apartments && apartments.map((apartment: any) => (
            <button className={classNames({ 'bg-primary': selectedApartment?.id == apartment.id }, 'p-2 rounded text-lg font-semibold hover:bg-primaryHover')} key={apartment.id} onClick={() => handleApartmentClick(apartment)}>
                  <h2>{apartment.name}</h2>
              </button>
          ))
        }
          <button className={classNames({ 'bg-primary': creating},'p-2 rounded text-lg font-semibold hover:bg-primaryHover')} onClick={handleOpenApartmentCreator}>+ Apartment</button>
      </div>
      {editing && (
        <ApartmentEditor />
      )}
      {creating && (
        <ApartmentsCreator kitchenType={props.kitchenType}/>  
      )}
    </>
  );
};

export default Apartments;