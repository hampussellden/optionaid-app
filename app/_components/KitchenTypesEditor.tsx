'use client'
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { createClient } from '@/utils/supabase/client';
import { CreationMessage, KitchenType, Project, FrontOption, WorktopOption, FrontType,WorktopType, Front,Worktop} from '@/app/types';
import FrontOptionsEditor from './FrontOptionsEditor';
import WorktopOptionsEditor from './WorktopOptionsEditor';
import Button from './Button';
import { SaveRounded } from '@mui/icons-material';

export type KitchenTypesEditorProps = {
  kitchenType: KitchenType;  
  project: Project;
};

const KitchenTypesEditor = (props: KitchenTypesEditorProps) => {
    const supabase = createClient();
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<CreationMessage>();
    // state to hold input value for kitchen type name and price change
    const [typeNameInputValue, setTypeNameInputValue] = useState<string>('');
    
    const handleTypeNameInputChange = (e: React.ChangeEvent<any>) => {
      setTypeNameInputValue(e.target.value)
    }
    // handle update of kitchen type name
    const handleTypeUpdate = () => {
      if (typeNameInputValue.length < 1) { setMessage({message:'A kitchen type must have a name', type: 'error'}); return }
      const updateKitchenType = async () => {
        const { data, error } = await supabase
        .from('kitchen_types')
        .update({name: typeNameInputValue})
        .eq('id', props.kitchenType.id)
        .select()
        if (error) console.log('error', error)
        if (data) {
          setMessage({message:'Kitchen type updated successfully', type:'success'})
          setLoading(false)
        }
      }
      updateKitchenType()

    }

    return (
        <div className='grow flex flex-col p-4 bg-primary rounded gap-4 justify-start'>
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
            <Button text='Save Changes' onClick={() => {handleTypeUpdate(), setLoading(true)}} loading={loading} icon={SaveRounded}/>
        </div>
    );
};

export default KitchenTypesEditor;