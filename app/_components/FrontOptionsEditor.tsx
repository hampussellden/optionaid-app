import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { createClient } from '@/utils/supabase/client';
import { CreationMessage, KitchenType, Project, FrontOption, WorktopOption, FrontType,WorktopType, Front,Worktop} from '@/app/types';
import Button from './Button';
import FrontOptionItem from './FrontOptionItem';
import { AddRounded } from '@mui/icons-material';

type FrontOptionsEditorProps = {
    kitchenType: KitchenType;
}

const FrontOptionsEditor = (props: FrontOptionsEditorProps) => {
  const supabase = createClient();
  const [fronts, setFronts] = useState<Front[]>([]);
  const [frontTypes, setFrontTypes] = useState<FrontType[]>([]);
  const [frontOptions, setFrontOptions] = useState<FrontOption[]>([]);
  const [priceInputValue, setPriceInputValue] = useState<number>(0);
  const [addFrontTypeId, setAddFrontTypeId] = useState<number>(1);
  const [addFront, setAddFront] = useState<Front | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchFrontsAndFrontTypes = async () => {
      const { data: fronts } = await supabase.from('fronts').select('*')
        setFronts(fronts as Front[])
        const { data: frontTypes } = await supabase.from('front_types').select('*')
        setFrontTypes(frontTypes as FrontType[])
    }
    const fetchFrontOptions = async () => {
      const { data: frontOptions, error: frontError } = await supabase.from('front_options').select('*, fronts(*,front_types(*))').eq('kitchen_type_id', props.kitchenType.id);
          if (frontError) console.log(frontError)
          setFrontOptions(frontOptions as FrontOption[])
      }
    fetchFrontsAndFrontTypes();
    fetchFrontOptions();
  },[props.kitchenType])

  const handleAddFrontTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    frontTypes?.filter((frontType: FrontType) => {
      if (frontType.id === parseInt(event.target.value)) {
        setAddFrontTypeId(frontType.id)
      }
    })
  }
  useEffect(() => {
    fronts?.filter((front: Front) => {
      if (front.front_type_id === addFrontTypeId) {
        setAddFront(front)
      }
    })
  },[addFrontTypeId])

  const handleAddFrontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    fronts?.filter((front: Front) => {
      if (front.id === parseInt(event.target.value)) {
        setAddFront(front)
      }
    })
  }
 
  const handlePriceInputChange = (e: React.ChangeEvent<any>) => {
    setPriceInputValue(e.target.value)
  }
  const handleRemoveExistingOption = async (id: number) => {
    const { data, error } = await supabase.from('front_options').delete().eq('id', id)
    if (error) console.log(error)
    setFrontOptions(frontOptions.filter((frontOption: FrontOption) => frontOption.id !== id))
  }

  const handleAddNewFrontOption = async () => {
    if (!addFront) return
    if(addFrontTypeId != addFront.front_type_id) return
    const { data, error } = await supabase.from('front_options').insert([
      { kitchen_type_id: props.kitchenType.id, front_id: addFront?.id, price: priceInputValue }
    ]).select()
    if (error) console.log(error)
    if(data) {
      setFrontOptions([...frontOptions, {
      id: data[0].id,
      kitchen_type_id: props.kitchenType.id,
      front_id: addFront.id,
      price: priceInputValue,
      fronts: {
        ...addFront,
        front_types: frontTypes.filter((frontType: FrontType) => frontType.id === addFrontTypeId)[0]
      }
    }])
    setLoading(false)
    }
  }

    return (
        <div className=''>
          <p className='text-xl font-bold my-2'>Current front options on this type</p>
            {frontOptions && (
              <div className='flex flex-col gap-2 items-start mb-8'>
                { frontOptions.map((frontOption: FrontOption) => (
                  <FrontOptionItem frontOption={frontOption} handleRemoveExistingOption={handleRemoveExistingOption} key={frontOption.id}/>
                ))}
              </div>
            )} 
            <p className='text-xl font-bold my-2'>Create new front option</p>              
            <div className='flex flex-row gap-4 items-end'>
              <div className='flex flex-col gap-2'>
                <p className='text-lg font-semibold'>Front Type</p>
                  {frontTypes && (
                    <select className='rounded py-2 px-4 text-text font-semibold text-lg bg-background' name="newFrontOptionType" id="newFrontOptionType" value={addFrontTypeId} onChange={handleAddFrontTypeChange}>
                      {frontTypes.map((frontType: FrontType) => (
                        <option value={frontType.id} key={frontType.id}>{frontType.name}</option>
                      ))}
                    </select>
                  )}
              </div>
              { fronts && (
                <div className='flex flex-col gap-2'>
                  <p className='text-lg font-semibold'>Front</p>
                  <select className='rounded py-2 px-4 text-text font-semibold text-lg bg-background' name="newFrontOptionFront" id="newFrontOptionFront" value={addFront?.id} onChange={handleAddFrontChange}>
                    {fronts.filter((front: Front,) => front.front_type_id === addFrontTypeId ).map((front: Front, index: number) => (
                      <option value={front.id} selected={ index==0 ? true : false} key={front.id}>{front.name}</option>
                      ))}
                  </select>
                </div>
              )}
                <div className='flex flex-col gap-2'>
                  <p className='text-lg font-semibold'>Price</p>
                  <input className='py-2 px-4 rounded text-text font-semibold text-lg bg-background' type="number" value={priceInputValue} onChange={handlePriceInputChange} />
                </div>
                <Button text='Add option' icon={AddRounded} onClick={() => {handleAddNewFrontOption(), setLoading(true)}} loading={loading}/>
            </div>
        </div>
    );
};

export default FrontOptionsEditor;