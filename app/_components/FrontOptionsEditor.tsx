import React, { useState, useEffect, useContext } from 'react';
import { createClient } from '@/utils/supabase/client';
import { KitchenType, FrontOption, FrontType, Front } from '@/app/types';
import Button from './Button';
import FrontOptionItem from './FrontOptionItem';
import { AddRounded } from '@mui/icons-material';
import { MessagesContext, MessagesContextType } from '@/app/admin/context/MessagesContext';

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
    <div className="">
      <div className="flex flex-row justify-between">
        <p className="text-xl text-text font-bold my-2">Current front options on this type</p>
        <p className="text-lg text-text font-semibold">
          Standard: {props.kitchenType.fronts?.front_types.name} {props.kitchenType.fronts?.name}
        </p>
      </div>
      {frontOptions && (
        <div className="flex flex-col gap-2 items-start mb-4 flex-wrap max-h-96">
          {frontOptions.map((frontOption: FrontOption) => (
            <FrontOptionItem
              frontOption={frontOption}
              handleRemoveExistingOption={handleRemoveExistingOption}
              key={frontOption.id}
              loading={loading}
            />
          ))}
        </div>
      )}
      <p className="text-xl font-bold my-2">Create new front option</p>
      <div className="flex flex-row gap-2 items-end">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">Front Type</p>
          {frontTypes && (
            <select
              className="rounded py-2 px-4 text-text font-semibold text-lg bg-background"
              name="newFrontOptionType"
              id="newFrontOptionType"
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
        </div>
        {fronts && addFrontType?.id && (
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">Front</p>
            <select
              className="rounded py-2 px-4 text-text font-semibold text-lg bg-background"
              name="newFrontOptionFront"
              id="newFrontOptionFront"
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
          </div>
        )}
        {addFront && (
          <>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold">Price</p>
              <input
                className="py-2 px-4 rounded text-text font-semibold text-lg bg-background"
                type="number"
                value={priceInputValue}
                onChange={handlePriceInputChange}
              />
            </div>
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
      </div>
    </div>
  );
};

export default FrontOptionsEditor;
