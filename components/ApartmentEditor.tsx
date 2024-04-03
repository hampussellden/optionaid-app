'use client';
import React, { useState, useEffect, useContext } from 'react';
import { createClient } from '@/utilities/supabase/client';
import { ClientUser, Apartment, Project, KitchenType } from '@/app/types';
import Button from './Button';
import { DeleteOutline, LockRounded, SaveRounded } from '@mui/icons-material';
import Box from './Box';
import { MessagesContext, MessagesContextType } from '../app/admin/context/MessagesContext';
import Text from './Text';

export type ApartmentEditorProps = {
  apartment: Apartment;
  kitchenType: KitchenType;
  project: Project;
};

const ApartmentEditor = (props: ApartmentEditorProps) => {
  const supabase = createClient();
  const [clients, setClients] = useState<ClientUser[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState<ClientUser | null>(null);
  const [currentClient, setCurrentClient] = useState<ClientUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { addMessage } = useContext(MessagesContext) as MessagesContextType;

  useEffect(() => {
    const fetchClientUsers = async () => {
      const { data: clients } = await supabase
        .from('users')
        .select('*')
        .eq('app_role', 'client')
        .order('full_name', { ascending: true });
      if (clients) {
        setClients(clients as ClientUser[]);
      }
    };
    fetchClientUsers();
  }, []);

  useEffect(() => {
    const getUserInfoWithApartmentUserId = async () => {
      if (!props.apartment.user_id) return;
      const { data: client, error } = await supabase.from('users').select('*').eq('id', props.apartment.user_id);
      if (client) setCurrentClient(client[0] as ClientUser);
    };
    setCurrentClient(null);
    if (props.apartment.user_id) getUserInfoWithApartmentUserId();
  }, [props.apartment]);

  const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    clients?.filter((client: ClientUser) => {
      if (client.id === event.target.value) {
        setSelectedClient(client);
      }
      if (event.target.value === 'undefined') setSelectedClient(null);
    });
  };

  const handleSaveChanges = async () => {
    if (inputValue.length < 1 && !selectedClient) {
      addMessage({ message: 'You must either assign a client or change the apartment name', type: 'error' });
      setLoading(false);
      return;
    }
    if (selectedClient) {
      const { data, error } = await supabase
        .from('apartments')
        .update({ user_id: selectedClient.id })
        .eq('id', props.apartment.id)
        .select();
      if (error) {
        addMessage({ message: 'Error assigning client', type: 'error' });
        setLoading(false);
      }
      if (data) {
        addMessage({ message: 'Client assigned successfully', type: 'success' });
        setCurrentClient(selectedClient);
      }
    }
    if (inputValue.length > 0) {
      const { data, error } = await supabase
        .from('apartments')
        .update({ name: inputValue })
        .eq('id', props.apartment.id)
        .select();
      if (error) {
        addMessage({ message: 'Error updating apartment name', type: 'error' });
        setLoading(false);
      }
      if (data) {
        addMessage({ message: 'Apartment name updated successfully', type: 'success' });
      }
    }
    setLoading(false);
  };

  const handleRemoveCurrentClient = async () => {
    if (currentClient) {
      const { data, error } = await supabase
        .from('apartments')
        .update({ user_id: null })
        .eq('id', props.apartment.id)
        .select();
      if (error) {
        addMessage({ message: 'Error removing client', type: 'error' });
        setLoading(false);
      }
      if (data) {
        addMessage({ message: 'Client removed successfully', type: 'success' });
        setCurrentClient(null);
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    setInputValue(e.target.value);
  };

  return (
    <Box primary grow>
      <div className="flex flex-row justify-between">
        <Text as="h4" size="small" text="Assign a client to this apartment" />
        <Text
          as="p"
          size="large"
          text={`${props.project.name} - type ${props.kitchenType.name} - ${props.apartment.name}`}
        />
      </div>
      {props.apartment.ready_for_order && (
        <Box>
          <Box horizontal>
            <LockRounded />
            <Text as="p" size="large" text="This apartment is ready for order" />
          </Box>
          <Text as="p" size="medium" italic text="This customer chose:" />
          <Text
            as="p"
            text={`${props.apartment.front_options?.fronts?.front_types?.name} ${props.apartment.front_options?.fronts?.name}`}
          />
          <Text
            as="p"
            text={`${props.apartment.worktop_options?.worktops?.worktop_types?.make} ${props.apartment.worktop_options?.worktops?.name}`}
          />
          <Text as="p" text={`for a total of: ${props.apartment.total_cost} SEK`} />
          {/* @TODO Add region specifik currecy */}
        </Box>
      )}
      <div className="flex flex-row gap-2 items-center">
        <Text as="p" text="Apartment name" />
        <input
          type="text"
          title="Apartment name"
          className="text-text font-semibold text-lg bg-background p-2 rounded"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      {currentClient && (
        <div className="flex flex-row items-center gap-2">
          <Text as="p" text="Current client:" />
          <div className="rounded bg-secondary py-2 px-4 w-fit">
            <Text as="p" text={`${currentClient?.full_name} - ${currentClient.email}`} />
          </div>
          <Button
            onClick={() => {
              setLoading(true), handleRemoveCurrentClient();
            }}
            icon={DeleteOutline}
            marginZero
            ariaLabel="Remove client from apartment"
            loading={loading}
            accent
          />
        </div>
      )}
      <div className="flex flex-row gap-2 items-center">
        <Text as="p" text="Set Client:" />
        {clients && (
          <select
            className="text-text font-semibold text-lg bg-background p-2 rounded"
            name="clients"
            title="Select a client"
            onChange={handleClientChange}
          >
            <option value={undefined} defaultValue={'Select a client'}>
              Select a client
            </option>
            {clients.map((client: ClientUser, i: number) => (
              <option value={client.id} key={i}>
                {client.full_name} - {client.email}
              </option>
            ))}
          </select>
        )}
      </div>
      <Button
        onClick={() => {
          setLoading(true);
          handleSaveChanges();
        }}
        text="Save Changes"
        loading={loading}
        icon={SaveRounded}
      />
    </Box>
  );
};

export default ApartmentEditor;
