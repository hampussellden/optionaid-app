'use client'
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { createClient } from '@/utils/supabase/client';
import { CreationMessage, KitchenType, Project, FrontOption, WorktopOption, FrontType,WorktopType, Front,Worktop} from '@/app/types';
import FrontOptionsEditor from './FrontOptionsEditor';
import WorktopOptionsEditor from './WorktopOptionsEditor';

export type KitchenTypesEditorProps = {
  kitchenType: KitchenType;  
  project: Project;
};

/*
  things to update 
    - kitchen type name
    - kitchen type frontoptions
    - kitchen type worktopoptions
    - standard fronts and worktops
*/

const KitchenTypesEditor = (props: KitchenTypesEditorProps) => {
    const supabase = createClient();
    const [message, setMessage] = useState<CreationMessage>();
    // state to hold input value for kitchen type name and price change
    const [typeNameInputValue, setTypeNameInputValue] = useState<string>('');
    // states to hold data about options
    const [worktopOptions, setWorktopOptions] = useState<WorktopOption[]>([]);
    // states to hold data about fronts and worktops
    const [worktops, setWorktops] = useState<Worktop[]>([]);
    // states to hold data about front and worktop types
    const [WorktopTypes, setWorktopTypes] = useState<WorktopType[]>([]);
    // states for when creating new options
    const [addWorktopType, setAddWorktopType] = useState<WorktopType | null>(null);
    const [addWorktop, setAddWorktop] = useState<Worktop | null>(null);
    

    //use effect fetches all the data needed for the editor
    useEffect(() => {
        const fetchTypesOptions = async () => {
          const { data: worktopOptions, error: worktopError } = await supabase.from('worktop_options').select('*,worktops(*,worktop_types(*))').eq('kitchen_type_id', props.kitchenType.id);
          setWorktopOptions(worktopOptions as WorktopOption[])
          if (worktopError) console.log(worktopError)
        }
      const fetchFrontsAndWorktops = async () => {
        const { data: worktops } = await supabase.from('worktops').select('*')
        setWorktops(worktops as Worktop[])
      }
      const fetchFrontTypesAndWorktopTypes = async () => {
        const { data: worktopTypes } = await supabase.from('worktop_types').select('*')
        setWorktopTypes(worktopTypes as WorktopType[])
      }
        fetchFrontTypesAndWorktopTypes();
        fetchFrontsAndWorktops();
        fetchTypesOptions()
    },[])
    
    const handleTypeNameInputChange = (e: React.ChangeEvent<any>) => {
      setTypeNameInputValue(e.target.value)
    }
   

    const handleTypeUpdate = () => {
        setMessage({message:'Kitchen type updated successfully', type:'success'})
    }

    return (
        <div className='w-full h-fill flex flex-col p-4 bg-primary rounded gap-6 justify-start'>
           <div className='flex flex-row justify-between'>
            <h4 className='text-2xl font-bold'>Editing kitchen type</h4>
            <p className='text-xl font-semibold ml-auto'>{props.project.name} - type {props.kitchenType.name}</p>
          </div>
          {message && <p className={classNames({'text-accent' : message.type == 'error','text-secondary': message.type == 'success'}, 'text-lg font-semibold')}>{message.message}</p> }
          <div className='flex flex-row gap-2 items-center'>
            <p className='text-lg font-bold text-text'>Type Name</p>
            <input className='bg-background text-text p-2 rounded' type="text" value={typeNameInputValue} onChange={handleTypeNameInputChange}/>
          </div>
          <hr className='border-background'></hr>
            <FrontOptionsEditor kitchenType={props.kitchenType}/>
            <hr className='border-background'></hr>
            <WorktopOptionsEditor kitchenType={props.kitchenType}/>
          <hr className='border-background'></hr>
            <button className='self-end mt-auto py-2 px-4 rounded text-lg font-bold bg-accent hover:bg-accentHover' onClick={handleTypeUpdate}>Save Changes</button>
        </div>
    );
};

export default KitchenTypesEditor;