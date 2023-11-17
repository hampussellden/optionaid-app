import React, { useState, useEffect, useContext } from 'react';
import { createClient } from '@/utils/supabase/client';
import { KitchenType, WorktopOption, WorktopType, Worktop } from '@/app/types';
import WorktopOptionItem from './WorktopOptionItem';
import Button from './Button';
import { AddRounded } from '@mui/icons-material';
import { MessagesContext, MessagesContextType } from '../admin/context/MessagesContext';

type WorktopOptionsEditor = {
  kitchenType: KitchenType;
};

const WorktopOptionsEditor = (props: WorktopOptionsEditor) => {
  const supabase = createClient();
  const [worktops, setWorktops] = useState<Worktop[]>([]);
  const [worktopTypes, setWorktopTypes] = useState<WorktopType[]>([]);
  const [worktopOptions, setWorktopOptions] = useState<WorktopOption[]>([]);
  const [priceInputValue, setPriceInputValue] = useState<number>(0);
  const [addWorktopTypeId, setaddWorktopTypeId] = useState<number>(1);
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

  useEffect(() => {
    worktops?.filter((worktop: Worktop) => {
      if (worktop.worktop_type_id === addWorktopTypeId) {
        setAddWorktop(worktop);
      }
    });
  }, [addWorktopTypeId]);

  const handleAddWorktopTypeId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    worktopTypes?.filter((worktopType: WorktopType) => {
      if (worktopType.id === parseInt(event.target.value)) {
        setaddWorktopTypeId(worktopType.id);
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
      const { data, error } = await supabase.from('worktop_options').delete().eq('id', id);
      if (error) {
        addMessage({ message: 'Error removing worktop option', type: 'error' });
        setLoading(false);
      }
      if (data) {
        addMessage({ message: 'Worktop option removed successfully', type: 'success' });
        setWorktopOptions(worktopOptions.filter((worktopOption: WorktopOption) => worktopOption.id !== id));
      }
    };
    setLoading(true);
    removeEsixtingWorktopOption();
  };

  const handleNewWorktopOption = async () => {
    const addNewWorktopOption = async () => {
      if (!addWorktop) return;
      if (addWorktopTypeId != addWorktop.worktop_type_id) return;
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
              worktop_types: worktopTypes.filter((worktopType: WorktopType) => worktopType.id === addWorktopTypeId)[0],
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
    <div>
      <p className="text-xl font-bold my-2">Current Front options on this type</p>
      {worktopOptions && (
        <div className="flex flex-col gap-2 items-start mb-8">
          {worktopOptions.map((worktopOption: WorktopOption) => (
            <WorktopOptionItem
              worktopOption={worktopOption}
              handleRemoveExistingOption={handleRemoveExistingOption}
              key={worktopOption.id}
            />
          ))}
        </div>
      )}
      <p className="text-xl font-bold my-2">Create new worktop option</p>
      <div className="flex flex-row gap-2 items-end">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">Worktop Make</p>
          {worktopTypes && (
            <select
              className="rounded py-2 px-4 text-text font-semibold text-lg bg-background"
              name="newWorktopOptionType"
              id="newWorktopOptionType"
              value={addWorktopTypeId}
              onChange={handleAddWorktopTypeId}
            >
              {worktopTypes.map((worktopType: WorktopType) => (
                <option value={worktopType.id} key={worktopType.id}>
                  {worktopType.make}
                </option>
              ))}
            </select>
          )}
        </div>
        {worktops && (
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">Worktop</p>
            <select
              className="rounded py-2 px-4 text-text font-semibold text-lg bg-background"
              name="newFrontOptionFront"
              id="newFrontOptionFront"
              value={addWorktop?.id}
              onChange={handleAddWorktopChange}
            >
              {worktops
                .filter((worktop: Worktop) => worktop.worktop_type_id === addWorktopTypeId)
                .map((worktop: Worktop, index: number) => (
                  <option value={worktop.id} selected={index == 0 ? true : false} key={worktop.id}>
                    {worktop.name}
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
          ariaLabel="Add new worktop option"
          text="Add"
          onClick={handleNewWorktopOption}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default WorktopOptionsEditor;
