import React, { useState } from 'react';
import classNames from 'classnames';
import Button from './Button';
import { AddRounded } from '@mui/icons-material';
import { createClient } from '@/utils/supabase/client';
import { CreationMessage } from '../types';

type WorktopTypesCreatorProps = {
    
}


const WorktopTypesCreator = (props: WorktopTypesCreatorProps) => {
    const supabase = createClient();
    const [inputValue, setInputValue] = useState<string>('');
    const [message, setMessage] = useState<CreationMessage | null>();
    const [loading, setLoading] = useState<boolean>(false);

    const handleCreateNewWorktopType = () => {
      const createWorktopType = async () => {
        if (inputValue.length < 1) {
          setMessage({message:'A worktop type must have a name', type: 'error'})
          setLoading(false)
          return
        }
        const { data, error } = await supabase
        .from('worktop_types')
        .insert({make: inputValue}).select();
        if (error) {
          setMessage({message:'An error occured', type: 'error'})
          setLoading(false)
        }
        if (data) {
          setMessage({message:'Worktop type created successfully', type:'success'})
          setLoading(false)
        }
      }
      setLoading(true)
      createWorktopType()
    }
    const handleInputValue = (e: React.ChangeEvent<any>) => {
      setInputValue(e.target.value)
    }
    return (
        <div className='grow bg-primary rounded p-4 flex flex-col gap-4'>
            <p className='text-2xl font-bold text-text'>Creating worktop type</p>
            <p className='text-lg font-semibold text-text'>Worktop make</p>
            <input type="text" className='text-text bg-background rounded py-2 px-4 font-semibold' onChange={handleInputValue} value={inputValue} />
            <div className='flex flex-row gap-4 ml-auto'>
            {message && ( <p className={classNames({'text-accent' : message.type == 'error', 'text-text' : message.type == 'success'}, 'text-lg font-semibold p-2 bg-background rounded')}>{message.message}</p>)}
            <Button text='Create new worktop type' icon={AddRounded} loading={loading} onClick={handleCreateNewWorktopType}/>
            </div>
        </div>
    );
};

export default WorktopTypesCreator;