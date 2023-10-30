'use client'
import React, {useState} from 'react';
import { KitchenType } from './KitchenTypes';
import {User} from './KitchenTypes'
import ApartmentsCreator from './ApartmentsCreator';
export type ApartmentsProps = {
    kitchenType: KitchenType;
    apartments?: any;
    handleTypeEditorClose: () => void
}
export type Apartment = {
  id:number;
  kitchen_type_id: number;
  name: string;
  front_id: number;
  worktop_id: number;
  user_id: number;
  users?: User;
  }
const Apartments = (props:ApartmentsProps) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null)

  const handleApartmentClick = (apartment:Apartment) => {
    props.handleTypeEditorClose()
    setSelectedApartment(apartment)
    setEditing(true)
    setCreating(false)
  }

  const handleApartmentCreatorOpen = () => {
    setCreating(true)
    setEditing(false)
  }

  return (
    <>
      <div className='flex flex-col min-w-fit items-start'>
          { props.kitchenType.apartments && props.kitchenType.apartments.map((apartment: any) => (
            <button className={selectedApartment?.id == apartment.id ? 'bg-white text-black' : ''} key={apartment.id} onClick={() => handleApartmentClick(apartment)}>
                  <h2>{apartment.name}</h2>
              </button>
          ))
        }
          <button onClick={handleApartmentCreatorOpen}>add new apartment +</button>
      </div>
      {editing && (
        <div className='self-end bg-slate-500 h-40 w-full'>
          editing apartment here
        </div>
      )}
      {creating && (
        <ApartmentsCreator />  
      )}
    </>
  );
};

export default Apartments;