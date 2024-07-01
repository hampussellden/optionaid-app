'use client';
import React, { useState, useEffect, useContext } from 'react';
import { createClient } from '@/utilities/supabase/client';
import { ClientUser, Apartment, Project, KitchenType } from '@/app/types';
import Button from '@/components/Button';
import { DeleteOutline, LockRounded, SaveRounded } from '@mui/icons-material';
import { MessagesContext, MessagesContextType } from '../app/admin/context/MessagesContext';
import Flex from '@/Containers/Flex';
import Text from '@/components/Text';
import { ProjectsContext, ProjectsContextType } from '@/app/admin/context/ProjectsContext';

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
  const { addMessage} = useContext(MessagesContext) as MessagesContextType;
  const {updateApartment} = useContext(ProjectsContext) as ProjectsContextType;

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
    setLoading(true);
    if (inputValue.length < 1 && !selectedClient) {
      addMessage({ message: 'You must either assign a client or change the apartment name', type: 'error' });
      setLoading(false);
      return;
    }
    addMessage(await updateApartment({
      ...props.apartment,
      user_id: selectedClient?.id || props.apartment.user_id,
      name: inputValue || props.apartment.name,
    }));
    setLoading(false);
  };

  const handleRemoveCurrentClient = async () => {
    addMessage(await updateApartment({
      ...props.apartment,
      user_id: null,
    }))
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Flex direction="column" align="stretch" gap={4}>
        <Flex direction="column" align="stretch" gap={1} classNames="bg-primary px-1 py-2 rounded">
          <Flex justify="between" classNames="w-full">
            <Text as="h4" size="small">
              Edit Apartment
            </Text>
            <Text as="p" size="medium">
              {props.project.name} - type {props.kitchenType.name} - {props.apartment.name}
            </Text>
          </Flex>
          <Flex gap={1} direction="column">
            <Text as="p" size="medium">
              Apartment name:
            </Text>
            <input
              type="text"
              title="Apartment name"
              className="text-text font-semibold text-lg py-1 px-2 rounded bg-static max-w-[20ch]"
              value={inputValue}
              onChange={handleInputChange}
            />
          </Flex>
        </Flex>
        <Flex direction="column" gap={1} classNames="bg-primary px-1 py-2 rounded">
          <Text as="h4" size="small">
            Manage Client
          </Text>
          {currentClient && (
            <Flex direction="column" gap={1}>
              <Text as="p" size="medium">
                Current client:
              </Text>
              <Flex gap={2} align="center" classNames="rounded bg-static pl-1" justify='between'>
                <Text as="p" size="medium">
                  {currentClient?.full_name} - {currentClient.email}
                </Text>
                <Button
                  onClick={handleRemoveCurrentClient}
                  icon={DeleteOutline}
                  ariaLabel="Remove client from apartment"
                  loading={loading}
                  accent
                />
              </Flex>
            </Flex>
          )}
          <Flex gap={1} direction="column">
            <Text as="p" size="medium">
              Update Client:
            </Text>
            {clients && (
              <select
                className="text-text py-1 px-2 rounded bg-static max-w-[30ch]"
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
          </Flex>
        </Flex>
        {props.apartment.ready_for_order && (
          <Flex direction="column" gap={1} classNames="bg-static p-2 rounded">
            <Flex gap={2} align="center" classNames="bg-static p-2 rounded">
              <LockRounded />
              <Text>This apartment is ready for order</Text>
            </Flex>
            <Text as="p" size="medium" italic>
              This customer chose:
            </Text>
            <Text as="p" size="small">
              {props.apartment.front_options?.fronts?.front_types?.name} {props.apartment.front_options?.fronts?.name}
            </Text>
            <Text as="p" size="small">
              {props.apartment.worktop_options?.worktops?.worktop_types?.make}{' '}
              {props.apartment.worktop_options?.worktops?.name}
            </Text>
            <Text as="p" size="small">
              for a total of: {props.apartment.total_cost} SEK
            </Text>
            {/* @TODO Add region specifik currecy */}
          </Flex>
        )}
        <Button
          onClick={() => {
            setLoading(true);
            handleSaveChanges();
          }}
          text="Save Changes"
          loading={loading}
          icon={SaveRounded}
          fullWidth
        />
      </Flex>
    </>
  );
};

export default ApartmentEditor;
