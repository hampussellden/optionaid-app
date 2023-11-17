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
  const [addFrontTypeId, setAddFrontTypeId] = useState<number>(1);
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

  useEffect(() => {
    fronts?.filter((front: Front) => {
      if (front.front_type_id === addFrontTypeId) {
        setAddFront(front);
      }
    });
  }, [addFrontTypeId]);

  const handleAddFrontTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    frontTypes?.filter((frontType: FrontType) => {
      if (frontType.id === parseInt(event.target.value)) {
        setAddFrontTypeId(frontType.id);
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
      const { data, error } = await supabase.from('front_options').delete().eq('id', id);
      if (error) {
        addMessage({ message: 'Error removing front option', type: 'error' });
        setLoading(false);
      }
      if (data) {
        addMessage({ message: 'Front option removed successfully', type: 'success' });
        setFrontOptions(frontOptions.filter((frontOption: FrontOption) => frontOption.id !== id));
      }
    };
    setLoading(true);
    removeExistingFrontOption();
  };

  const handleAddNewFrontOption = async () => {
    if (!addFront) return;
    if (addFrontTypeId != addFront.front_type_id) return;
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
            front_types: frontTypes.filter((frontType: FrontType) => frontType.id === addFrontTypeId)[0],
          },
        },
      ]);
      setLoading(false);
    }
  };

  return (
    <div className="">
      <p className="text-xl font-bold my-2">Current front options on this type</p>
      {frontOptions && (
        <div className="flex flex-col gap-2 items-start mb-8">
          {frontOptions.map((frontOption: FrontOption) => (
            <FrontOptionItem
              frontOption={frontOption}
              handleRemoveExistingOption={handleRemoveExistingOption}
              key={frontOption.id}
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
              value={addFrontTypeId}
              onChange={handleAddFrontTypeChange}
            >
              {frontTypes.map((frontType: FrontType) => (
                <option value={frontType.id} key={frontType.id}>
                  {frontType.name}
                </option>
              ))}
            </select>
          )}
        </div>
        {fronts && (
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">Front</p>
            <select
              className="rounded py-2 px-4 text-text font-semibold text-lg bg-background"
              name="newFrontOptionFront"
              id="newFrontOptionFront"
              value={addFront?.id}
              onChange={handleAddFrontChange}
            >
              {fronts
                .filter((front: Front) => front.front_type_id === addFrontTypeId)
                .map((front: Front, index: number) => (
                  <option value={front.id} selected={index == 0 ? true : false} key={front.id}>
                    {front.name}
                  </option>
                ))}
            </select>
          </div>
        )}
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
          onClick={() => {
            setLoading(true), handleAddNewFrontOption();
          }}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default FrontOptionsEditor;
