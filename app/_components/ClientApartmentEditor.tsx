'use client'
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Apartment, KitchenType, Front, Worktop, FrontOption, WorktopOption} from '../types';
import { createClient } from '@/utils/supabase/client';
import MenuItem from './MenuItem';
import { CabinTwoTone, CountertopsOutlined, CountertopsTwoTone, SensorDoorOutlined, SensorDoorTwoTone } from '@mui/icons-material';
import KitchenRenderer from './KitchenRenderer';

type ClientApartmentEditorProps = {
    apartment: Apartment;
    kitchenType: KitchenType;
}


const ClientApartmentEditor = (props: ClientApartmentEditorProps) => {
    const supabase = createClient();
    const [frontOptions, setFrontOptions] = useState<FrontOption[]>([]);
    const [worktopOptions, setWorktopOptions] = useState<WorktopOption[]>([]);
    const [selectedFrontOption, setSelectedFrontOption] = useState<FrontOption | null>(null);
    const [selectedWorktopOption, setSelectedWorktopOption] = useState<WorktopOption | null>(null);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [loadRender, setLoadRender] = useState<boolean>(false);
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
      setSelectedFrontOption(null)
      setSelectedWorktopOption(null)
      fetchFrontOptionsAndWorktopOptions()
    },[props.kitchenType])

    const handleSelectFrontOption = (frontOption: FrontOption) => {
      setSelectedFrontOption(frontOption)
    }
    const handleSelectWorktopOption = (worktopOption: WorktopOption) => {
      setSelectedWorktopOption(worktopOption)
    }
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
    return (
        <div className='flex flex-row gap-2 justify-between w-fill min-h-[90vh]'>
            {props.apartment.ready_for_order ? (
              <div className='bg-primary grow rounded'>
                <p className='font-bold text-2xl'>Apartment is ready for order, no more changes can be made here. Contact your project manager if you need help  </p>
              </div>
            ):(
              <div className='bg-static flex flex-col gap-2 rounded p-2 w-fit'>
                <MenuItem text='Fronts' icon={SensorDoorTwoTone} />
                {frontOptions && frontOptions.map((frontOption) => (
                <ul className='pl-4'>
                  { frontOption.fronts && 
                    <MenuItem 
                      text={frontOption.fronts?.name} 
                      icon={SensorDoorOutlined} onClick={() => handleSelectFrontOption(frontOption)} 
                      active={selectedFrontOption==frontOption ? true:false}/>
                  }
                </ul>
                ))}
                <MenuItem text='Worktops' icon={CountertopsTwoTone}/>
                {worktopOptions && worktopOptions.map((worktopOption) => (
                <ul className='pl-4'>
                  { worktopOption.worktops && 
                    <MenuItem 
                      text={worktopOption.worktops.worktop_types.make + ' ' + worktopOption.worktops?.name} icon={CountertopsOutlined}
                      onClick={() => handleSelectWorktopOption(worktopOption)}
                      active={selectedWorktopOption==worktopOption ? true:false}
                    />
                  }
                </ul>
                ))}
              </div>
            )}
            { frontOptions && worktopOptions && loadRender &&(
              <KitchenRenderer  
              front={selectedFrontOption?.fronts ?? undefined} 
              worktop={selectedWorktopOption?.worktops ?? undefined}
              standardFront={props.kitchenType?.fronts}
              standardWorktop={props.kitchenType?.worktops}
              totalCost={totalCost}
              />
            )}
        </div>
    );
};

export default ClientApartmentEditor;