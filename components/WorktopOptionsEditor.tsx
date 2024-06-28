import React, { useState, useEffect, useContext } from 'react';
import { createClient } from '@/utilities/supabase/client';
import { KitchenType, WorktopOption, WorktopType, Worktop } from '@/app/types';
import WorktopOptionItem from './WorktopOptionItem';
import Button from './Button';
import { AddRounded } from '@mui/icons-material';
import { MessagesContext, MessagesContextType } from '../app/admin/context/MessagesContext';
import Flex from '@/Containers/Flex';
import Text from './Text';

type WorktopOptionsEditor = {
  kitchenType: KitchenType;
};

const WorktopOptionsEditor = (props: WorktopOptionsEditor) => {
  const supabase = createClient();
  const [worktops, setWorktops] = useState<Worktop[]>([]);
  const [worktopTypes, setWorktopTypes] = useState<WorktopType[]>([]);
  const [worktopOptions, setWorktopOptions] = useState<WorktopOption[]>([]);
  const [priceInputValue, setPriceInputValue] = useState<number>(0);
  const [addWorktopType, setAddWorktopType] = useState<WorktopType | null>(null);
  const [addWorktop, setAddWorktop] = useState<Worktop | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { addMessage } = useContext(MessagesContext) as MessagesContextType;

  useEffect(() => {
    const fetchWorktopAndWorktopTypes = async () => {
      const { data: worktops, error: worktopsError } = await supabase.from('worktops').select('*');
      const { data: worktopTypes, error: worktopTypesError } = await supabase.from('worktop_types').select('*');
      if (worktopsError || worktopTypesError) {
        addMessage({ message: 'Error fetching worktops or worktop types', type: 'error' });
      }
      if (worktops && worktopTypes) {
        setWorktops(worktops as Worktop[]);
        setWorktopTypes(worktopTypes as WorktopType[]);
      }
    };
    const fetchWorktopOptions = async () => {
      const { data: worktopOptions, error: worktopError } = await supabase
        .from('worktop_options')
        .select('*, worktops(*,worktop_types(*))')
        .eq('kitchen_type_id', props.kitchenType.id)
        .order('price', { ascending: true });
      if (worktopError) {
        addMessage({ message: 'Error fetching worktop options', type: 'error' });
      }
      if (worktopOptions) setWorktopOptions(worktopOptions as WorktopOption[]);
    };
    fetchWorktopAndWorktopTypes();
    fetchWorktopOptions();
  }, [props.kitchenType]);

  const handleAddWorktopTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'Select a worktop type') {
      setAddWorktopType(null);
      setAddWorktop(null);
      return;
    }
    worktopTypes?.filter((worktopType: WorktopType) => {
      if (worktopType.id === parseInt(event.target.value)) {
        setAddWorktopType(worktopType);
      }
    });
  };

  const handleAddWorktopChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    worktops?.filter((worktop: Worktop) => {
      if (worktop.id === parseInt(event.target.value)) {
        setAddWorktop(worktop);
      }
    });
  };

  const handlePriceInputChange = (e: React.ChangeEvent<any>) => {
    setPriceInputValue(e.target.value);
  };

  const handleRemoveExistingOption = async (id: number) => {
    const removeEsixtingWorktopOption = async () => {
      const { error } = await supabase.from('worktop_options').delete().eq('id', id);
      if (error) {
        addMessage({ message: 'Error removing worktop option', type: 'error' });
        setLoading(false);
        return;
      }
      addMessage({ message: 'Worktop option removed successfully', type: 'success' });
      setWorktopOptions(worktopOptions.filter((worktopOption: WorktopOption) => worktopOption.id !== id));
      setLoading(false);
    };
    setLoading(true);
    removeEsixtingWorktopOption();
  };

  const handleNewWorktopOption = async () => {
    const addNewWorktopOption = async () => {
      if (!addWorktop) return;
      if (addWorktopType?.id != addWorktop.worktop_type_id) return;
      const { data, error } = await supabase
        .from('worktop_options')
        .insert([{ kitchen_type_id: props.kitchenType.id, worktop_id: addWorktop.id, price: priceInputValue }])
        .select();
      if (error) {
        addMessage({ message: 'Error adding worktop option', type: 'error' });
        setLoading(false);
      }
      if (data) {
        addMessage({ message: 'Worktop option added successfully', type: 'success' });
        //updates state on database input success to avoid unnecessary fetch
        setWorktopOptions([
          ...worktopOptions,
          {
            id: data[0].id,
            kitchen_type_id: props.kitchenType.id,
            worktop_id: addWorktop.id,
            price: priceInputValue,
            worktops: {
              ...addWorktop,
              worktop_types: worktopTypes.filter(
                (worktopType: WorktopType) => worktopType.id === addWorktopType?.id
              )[0],
            },
          },
        ]);
        setLoading(false);
      }
    };
    setLoading(true);
    addNewWorktopOption();
  };

  return (
    <Flex direction="column" gap={2}>
      <Flex direction="column" gap={1} classNames="w-full">
        <Flex justify="between" align="center" classNames="w-full">
          <Text as="h4" size="small">
            Current Worktop options on this type
          </Text>
          <Text as="p" size="medium">
            Standard: {props.kitchenType.worktops?.worktop_types?.make} {props.kitchenType.worktops?.name}
          </Text>
        </Flex>
      </Flex>
      {worktopOptions && (
        <Flex gap={1} direction="column" justify="between" classNames="w-full">
          {worktopOptions.map((worktopOption: WorktopOption) => (
            <WorktopOptionItem
              worktopOption={worktopOption}
              handleRemoveExistingOption={handleRemoveExistingOption}
              key={worktopOption.id}
            />
          ))}
        </Flex>
      )}
      <Flex direction="column" gap={1} classNames="w-full bg-primary p-1 rounded">
        <Text as="h4" size="small">
          Create new worktop option
        </Text>
        <Flex gap={2} align="end">
          <Flex direction="column" gap={1}>
            <Text as="p" size="small">
              Worktop Make
            </Text>
            {worktopTypes && (
              <select
                className="rounded py-1 px-2 text-text bg-static"
                name="newWorktopOptionType"
                id="newWorktopOptionType"
                aria-label="Select a worktop type"
                title="Select a worktop type"
                onChange={handleAddWorktopTypeChange}
              >
                <option value={undefined}>Select a worktop type</option>
                {worktopTypes.map((worktopType: WorktopType) => (
                  <option value={worktopType.id} key={worktopType.id}>
                    {worktopType.make}
                  </option>
                ))}
              </select>
            )}
          </Flex>
          {worktops && addWorktopType && (
            <Flex direction="column" gap={1}>
              <Text as="p" size="small">
                worktop
              </Text>
              <select
                className="rounded py-1 px-2 text-text bg-static"
                name="newFrontOptionFront"
                id="newFrontOptionFront"
                aria-label="Select a worktop"
                title="Select a worktop"
                onChange={handleAddWorktopChange}
              >
                <option value={undefined}>Select a worktop</option>
                {worktops
                  .filter((worktop: Worktop) => worktop.worktop_type_id === addWorktopType?.id)
                  .map((worktop: Worktop, index: number) => (
                    <option value={worktop.id} key={worktop.id}>
                      {worktop.name}
                    </option>
                  ))}
              </select>
            </Flex>
          )}
          {addWorktop && (
            <>
              <Flex direction="column" gap={1}>
                <Text as="p" size="small">
                  Price
                </Text>
                <input
                  className="py-1 px-2 rounded text-text bg-static"
                  type="number"
                  title="Worktop option price"
                  value={priceInputValue}
                  onChange={handlePriceInputChange}
                />
              </Flex>
              <Button
                icon={AddRounded}
                marginZero
                ariaLabel="Add new worktop option"
                text="Add"
                onClick={handleNewWorktopOption}
                loading={loading}
              />
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default WorktopOptionsEditor;
