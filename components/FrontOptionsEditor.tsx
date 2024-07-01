import React, { useState, useEffect, useContext } from 'react';
import { createClient } from '@/utilities/supabase/client';
import { KitchenType, FrontOption, FrontType, Front } from '@/app/types';
import Button from './Button';
import FrontOptionItem from './FrontOptionItem';
import { AddRounded } from '@mui/icons-material';
import { MessagesContext, MessagesContextType } from '@/app/admin/context/MessagesContext';
import Flex from '@/Containers/Flex';
import Text from './Text';

type FrontOptionsEditorProps = {
  kitchenType: KitchenType;
};

const FrontOptionsEditor = (props: FrontOptionsEditorProps) => {
  const supabase = createClient();
  const [fronts, setFronts] = useState<Front[]>([]);
  const [frontTypes, setFrontTypes] = useState<FrontType[]>([]);
  const [frontOptions, setFrontOptions] = useState<FrontOption[]>([]);
  const [priceInputValue, setPriceInputValue] = useState<number>(0);
  const [addFrontType, setAddFrontType] = useState<FrontType | null>(null);
  const [addFront, setAddFront] = useState<Front | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { addMessage } = useContext(MessagesContext) as MessagesContextType;

  useEffect(() => {
    const fetchFrontsAndFrontTypes = async () => {
      const { data: fronts, error: frontsError } = await supabase.from('fronts').select('*');
      const { data: frontTypes, error: frontTypesError } = await supabase.from('front_types').select('*');
      if (frontsError || frontTypesError) {
        addMessage({ message: 'Error fetching fronts or front types', type: 'error' });
      }
      if (fronts && frontTypes) {
        setFronts(fronts as Front[]);
        setFrontTypes(frontTypes as FrontType[]);
      }
    };
    const fetchFrontOptions = async () => {
      const { data: frontOptions, error: frontError } = await supabase
        .from('front_options')
        .select('*, fronts(*,front_types(*))')
        .eq('kitchen_type_id', props.kitchenType.id)
        .order('price', { ascending: true });
      if (frontError) {
        addMessage({ message: 'Error fetching front options', type: 'error' });
      }
      if (frontOptions) setFrontOptions(frontOptions as FrontOption[]);
    };
    fetchFrontsAndFrontTypes();
    fetchFrontOptions();
  }, [props.kitchenType]);

  const handleAddFrontTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'Select a front type') {
      setAddFrontType(null);
      setAddFront(null);
      return;
    }
    frontTypes?.filter((frontType: FrontType) => {
      if (frontType.id === parseInt(event.target.value)) {
        setAddFrontType(frontType);
      }
    });
  };

  const handleAddFrontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    fronts?.filter((front: Front) => {
      if (front.id === parseInt(event.target.value)) {
        setAddFront(front);
      }
    });
  };

  const handlePriceInputChange = (e: React.ChangeEvent<any>) => {
    setPriceInputValue(e.target.value);
  };

  const handleRemoveExistingOption = async (id: number) => {
    const removeExistingFrontOption = async () => {
      //Supabase delete will not return data, only eventual error
      const { error } = await supabase.from('front_options').delete().eq('id', id);
      if (error) {
        addMessage({ message: 'Error removing front option', type: 'error' });
        setLoading(false);
        return;
      }
      addMessage({ message: 'Front option removed successfully', type: 'success' });
      setFrontOptions(frontOptions.filter((frontOption: FrontOption) => frontOption.id !== id));
      setLoading(false);
    };
    setLoading(true);
    removeExistingFrontOption();
  };

  const handleAddNewFrontOption = async () => {
    const addNewFrontOption = async () => {
      if (!addFront) {
        addMessage({ message: 'Please select a front', type: 'error' });
        setLoading(false);
        return;
      }
      if (addFrontType?.id != addFront.front_type_id) {
        addMessage({ message: 'Please select a front', type: 'error' });
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('front_options')
        .insert([{ kitchen_type_id: props.kitchenType.id, front_id: addFront?.id, price: priceInputValue }])
        .select();
      if (error) {
        addMessage({ message: 'Error adding front option', type: 'error' });
        setLoading(false);
      }
      if (data) {
        addMessage({ message: 'Front option added successfully', type: 'success' });
        //updates state on database input success to avoid unnecessary fetch
        setFrontOptions([
          ...frontOptions,
          {
            id: data[0].id,
            kitchen_type_id: props.kitchenType.id,
            front_id: addFront.id,
            price: priceInputValue,
            fronts: {
              ...addFront,
              front_types: frontTypes.filter((frontType: FrontType) => frontType.id === addFrontType.id)[0],
            },
          },
        ]);
        setLoading(false);
      }
    };
    setLoading(true);
    addNewFrontOption();
  };

  return (
    <Flex direction="column" gap={2}>
      <Flex justify="between" classNames="w-full">
        <Text as="h4" size="small">
          Curent front options on this type
        </Text>
        <Text as="p" size="medium">
          Standard: {props.kitchenType.fronts?.front_types?.name} {props.kitchenType.fronts?.name}
        </Text>
      </Flex>
      {frontOptions && (
        <Flex direction="column" align="start" gap={1} classNames="w-full">
          {frontOptions.map((frontOption: FrontOption) => (
            <FrontOptionItem
              frontOption={frontOption}
              handleRemoveExistingOption={handleRemoveExistingOption}
              key={frontOption.id}
              loading={loading}
            />
          ))}
        </Flex>
      )}
      <Flex direction="column" gap={1} classNames="w-full bg-primary p-1 rounded">
        <Text as="h4" size="small">
          Create new front option
        </Text>
        <Flex gap={2} align="end">
          <Flex direction="column" gap={1}>
            <Text as="p" size="small">
              Front Type
            </Text>
            {frontTypes && (
              <select
                className="rounded py-1 px-2 text-text bg-background"
                name="newFrontOptionType"
                id="newFrontOptionType"
                aria-label="Select a front type"
                title="Select a front type"
                onChange={handleAddFrontTypeChange}
              >
                <option value={undefined}>Select a front type</option>
                {frontTypes.map((frontType: FrontType) => (
                  <option value={frontType.id} key={frontType.id}>
                    {frontType.name}
                  </option>
                ))}
              </select>
            )}
          </Flex>
          {fronts && addFrontType?.id && (
            <Flex direction="column" gap={1}>
              <Text as="p" size="small">
                Front
              </Text>
              <select
                className="rounded py-1 px-2 text-text bg-background"
                name="newFrontOptionFront"
                id="newFrontOptionFront"
                aria-label="Select a front"
                title="Select a front"
                onChange={handleAddFrontChange}
              >
                <option value={undefined}>select a front</option>
                {fronts
                  .filter((front: Front) => front.front_type_id === addFrontType.id)
                  .map((front: Front) => (
                    <option value={front.id} key={front.id}>
                      {front.name}
                    </option>
                  ))}
              </select>
            </Flex>
          )}
          {addFront && (
            <>
              <Flex direction="column" gap={1}>
                <Text as="p" size="small">
                  Price
                </Text>
                <input
                  className="py-1 px-2 rounded text-text bg-background"
                  type="number"
                  title="Front option price"
                  value={priceInputValue}
                  onChange={handlePriceInputChange}
                />
              </Flex>
              <Button
                icon={AddRounded}
                marginZero
                ariaLabel="Add new front option"
                text="Add"
                onClick={handleAddNewFrontOption}
                loading={loading}
              />
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FrontOptionsEditor;
