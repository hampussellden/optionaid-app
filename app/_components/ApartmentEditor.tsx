'use client'
import React,{useState, useEffect} from 'react';
import { createClient } from '@/utils/supabase/client';
import { ClientUser } from '@/app/types';

const ApartmentEditor = () => {
  const supabase = createClient();
  const [clients, setClients] = useState<ClientUser[]>([])
  useEffect(() => {
    const fetchClientUsers = async () => {
      const { data: clients } = await supabase.from('users').select('*').eq('app_role', 'client')
      setClients(clients as ClientUser[])
    }
    fetchClientUsers()
},[])
    return (
      <div className='w-full h-fill  flex flex-col p-4 bg-primary rounded items-start gap-6'>
        {clients.map(client => <p>{client.full_name}</p>)}
      </div>
    );
};

export default ApartmentEditor;