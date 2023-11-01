'use client'
import React,{useState, useEffect, use} from 'react';
import { createClient } from '@/utils/supabase/client';
import { ClientUser, Apartment, Project, KitchenType} from '@/app/types';
import Button from './Button';
import {DeleteOutline, SaveRounded } from '@mui/icons-material';

export type ApartmentEditorProps = {
  apartment: Apartment;
  kitchenType: KitchenType;
  project: Project;
};

const ApartmentEditor = (props: ApartmentEditorProps) => {
  const supabase = createClient();
  const [clients, setClients] = useState<ClientUser[]>([])
  const [selectedClient, setSelectedClient] = useState<ClientUser | null>(null)
  const [currentClient, setCurrentClient] = useState<ClientUser | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    const fetchClientUsers = async () => {
      const { data: clients } = await supabase.from('users').select('*').eq('app_role', 'client')
      if (clients) {
        setClients(clients as ClientUser[])
        setSelectedClient(clients[0] as ClientUser)
      }
    }
    fetchClientUsers()
  },[])

  const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    clients?.filter((client: ClientUser) => {
      if (client.id === (event.target.value)) {
        setSelectedClient(client)
      }
    })
  };
  const handleSaveChanges = async () => {
    if (selectedClient) {
      const { data, error } = await supabase
      .from('apartments')
      .update({user_id: selectedClient.id})
      .eq('id', props.apartment.id)
      .select()
      if (error) console.log('error', error)   
      if (data) setCurrentClient(selectedClient)
    }
    setLoading(false)
  }
  const handleRemoveCurrentClient = async () => {
    if (currentClient) {
      const { data, error } = await supabase
      .from('apartments')
      .update({user_id: null})
      .eq('id', props.apartment.id)
      .select()
      if (error) console.log('error', error)   
      if (data) setCurrentClient(null)
    }
  }

  useEffect(() => {
    const getUserInfoWithApartmentUserId = async () => {
      const { data: client, error } = await supabase.from('users').select('*').eq('id', props.apartment.user_id)
      if (error) console.log(error);
      if(client) setCurrentClient(client[0] as ClientUser)
    }
    if (props.apartment.user_id) getUserInfoWithApartmentUserId()
  }
  ,[])


  return (
    <div className='grow flex flex-col p-4 bg-primary rounded gap-6 justify-start'>
      <div className='flex flex-row justify-between'>
        <p className='text-xl font-bold text-text'>Assign a client to this apartment</p>
        <p className='text-xl font-semibold ml-auto'>{props.project.name} - type {props.kitchenType.name} - {props.apartment.name}</p>
      </div>
        {currentClient && (
          <div className='flex flex-row items-center gap-2'>
            <p className='text-text font-semibold text-lg'>Current client:</p>
            <div className='rounded bg-secondary py-2 px-4 w-fit'>
              <p className='text-text font-semibold text-lg'>{currentClient?.full_name} - {currentClient.email}</p>
            </div>
            <Button onClick={handleRemoveCurrentClient} icon={DeleteOutline} text='Remove' loading={loading}/>
          </div>
        )}
      <div className='flex flex-row gap-2 items-center'>
        <p className='text-text font-semibold text-lg'>Set Client:</p>
        {clients && (
          <select className='text-text font-semibold text-lg bg-background p-2 rounded' name="clients" id="clients" onChange={handleClientChange}>
            {clients.map((client: ClientUser, index: number) => ( 
              <option value={client.id} key={index} selected={index == 0 ? true : false}>{client.full_name} - {client.email}</option>
            ))}
          </select>
        )}
      </div>
      <Button onClick={() => {handleSaveChanges(), setLoading(true)}} text='Save Changes' loading={loading} icon={SaveRounded}/>
    </div>
  );
};

export default ApartmentEditor;