'use client'
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Apartment, KitchenType, Front, Worktop, FrontOption, WorktopOption} from '../types';
import { createClient } from '@/utils/supabase/client';
import MenuItem from './MenuItem';
import {CountertopsOutlined, CountertopsTwoTone, SensorDoorOutlined, SensorDoorTwoTone } from '@mui/icons-material';
import KitchenRenderer from './KitchenRenderer';

type ClientApartmentEditorProps = {
    apartment: Apartment;
    kitchenType: KitchenType;
}


const ClientApartmentEditor = (props: ClientApartmentEditorProps) => {
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [frontOptions, setFrontOptions] = useState<FrontOption[]>([]);
    const [worktopOptions, setWorktopOptions] = useState<WorktopOption[]>([]);
    const [selectedFrontOption, setSelectedFrontOption] = useState<FrontOption | null>(null);
    const [selectedWorktopOption, setSelectedWorktopOption] = useState<WorktopOption | null>(null);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [loadRender, setLoadRender] = useState<boolean>(false);
  
    useEffect(() => {
      setSelectedFrontOption(props.apartment.front_options ? props.apartment.front_options : null)
      setSelectedWorktopOption(props.apartment.worktop_options ? props.apartment.worktop_options : null)
      setTotalCost(props.apartment.total_cost)
    },[props.apartment.worktop_options,props.apartment.front_options])

    useEffect(() => {
      const fetchFrontOptionsAndWorktopOptions = async () => {
        const { data: frontOptions, error } = await supabase
          .from('front_options')
          .select('*,fronts(*,front_types(*))')
          .eq('kitchen_type_id', props.kitchenType.id)
        if (error) {
          console.log(error)
        }
        const { data: worktopOptions, error: worktopError } = await supabase
          .from('worktop_options')
          .select('*,worktops(*,worktop_types(*))')
          .eq('kitchen_type_id', props.kitchenType.id)
        if (worktopError) {
          console.log(worktopError)
        }
        if (frontOptions && worktopOptions) {
          setFrontOptions(frontOptions as FrontOption[])
          setWorktopOptions(worktopOptions as WorktopOption[])
          setLoadRender(true)
        }
      }
      setLoadRender(false)
      fetchFrontOptionsAndWorktopOptions()
    },[props.kitchenType])

    useEffect(() => {
      var totalCost = 0;
      if (selectedFrontOption != null) {
        totalCost += selectedFrontOption?.price ?? 0;
      }
      if (selectedWorktopOption) {
        totalCost += selectedWorktopOption.price 
      }
      setTotalCost(totalCost)
    },[selectedFrontOption, selectedWorktopOption])


    const handleSelectFrontOption = (frontOption: FrontOption) => {
      setSelectedFrontOption(frontOption)
    }
    const handleSelectWorktopOption = (worktopOption: WorktopOption) => {
      setSelectedWorktopOption(worktopOption)
    }

    const handleSaveApartmentChanges = async () => {
      const updateApartment = async () => {
      const { data, error } = await supabase
      .from('apartments')
      .update({front_option_id: selectedFrontOption?.id, worktop_option_id: selectedWorktopOption?.id, total_cost: totalCost})
      .eq('id', props.apartment.id)
      .select()
      if (error) console.log('error', error)
      if(data) setLoading(false)
      }
      setLoading(true)
      updateApartment()
    }
    
    return (
        <div className='flex flex-row gap-2 justify-between w-fill min-h-[90vh]'>
            {props.apartment.ready_for_order ? (
              <div className='bg-primary grow rounded'>
                <p className='font-bold text-2xl'>Apartment is ready for order, no more changes can be made here. Contact your project manager if you need help  </p>
              </div>
            ):(
              <div className='bg-static flex flex-col gap-2 rounded p-2 w-fit'>
                <MenuItem text='Fronts' icon={SensorDoorTwoTone} noHover/>
                {frontOptions && frontOptions.map((frontOption) => (
                <ul className='pl-4' key={frontOption.id}>
                  { frontOption.fronts && 
                    <MenuItem 
                      text={frontOption.fronts?.name} 
                      icon={SensorDoorOutlined} onClick={() => handleSelectFrontOption(frontOption)} 
                      active={selectedFrontOption?.id == frontOption.id ? true:false}/>
                  }
                </ul>
                ))}
                <MenuItem text='Worktops' icon={CountertopsTwoTone} noHover/>
                {worktopOptions && worktopOptions.map((worktopOption) => (
                <ul className='pl-4' key={worktopOption.id}>
                  { worktopOption.worktops && 
                    <MenuItem 
                      text={worktopOption.worktops.worktop_types.make + ' ' + worktopOption.worktops?.name} icon={CountertopsOutlined}
                      onClick={() => handleSelectWorktopOption(worktopOption)}
                      active={selectedWorktopOption?.id ==worktopOption.id ? true:false}
                    />
                  }
                </ul>
                ))}
              </div>
            )}
            { frontOptions && worktopOptions && loadRender && props.kitchenType.worktops && props.kitchenType.fronts && (
              <KitchenRenderer  
                front={selectedFrontOption?.fronts ?? undefined} 
                worktop={selectedWorktopOption?.worktops ?? undefined}
                standardFront={props.kitchenType?.fronts}
                standardWorktop={props.kitchenType?.worktops}
                totalCost={totalCost}
                apartmentId={props.apartment.id}
                saveChanges={handleSaveApartmentChanges}
                loading={loading}
              />
            )}
        </div>
    );
};

export default ClientApartmentEditor;