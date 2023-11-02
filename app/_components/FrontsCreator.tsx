import React, { useState } from 'react';
import classNames from 'classnames';
import ColorPicker from './ColorPicker';
import { CheckCircleOutline, CancelOutlined,SaveRounded, AddRounded } from '@mui/icons-material';
import { createClient } from '@/utils/supabase/client';
import Button from './Button';
import { CreationMessage } from '../types';
type FrontsCreatorProps = {
    frontTypeId : number | undefined;
}


const FrontsCreator = (props: FrontsCreatorProps) => {
    const supabase = createClient();
    const [frontColorInput, setFrontColorInput] = useState<string |null>(null);
    const [frontNameInput, setFrontNameInput] = useState<string>('');
    const [message, setMessage] = useState<CreationMessage | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFrontColor = (color: string | null) => {
      setFrontColorInput(color)
    }
    const handleFrontNameInput = (e: React.ChangeEvent<any>) => {
      setFrontNameInput(e.target.value)
    }

    const handleCreateNewFront = () => {
      const createFront = async () => {
        if (frontColorInput == null) { setMessage({message:'A front must have a color', type: 'error'}); setLoading(false); return }
        if (props.frontTypeId == undefined) { setMessage({message:'A front must have a type', type:'error'}); setLoading(false); return }
        if (frontNameInput.length < 1) { setMessage({message:'A front must have a name', type:'error'}); setLoading(false); return }
        const { data, error } = await supabase
        .from('fronts')
        .insert([{name: frontNameInput, color: frontColorInput, front_type_id: props.frontTypeId}]).select()
        if (error) console.log('error', error)
        if (data) {
          setMessage({message:'Front created successfully', type:'success'})
          setLoading(false);
        }
      }
      setLoading(true)
      createFront()
    }

    return (
        <div className='flex flex-col bg-primary grow p-4 rounded gap-4'>
          <div>
            <p className='text-2xl font-bold text-text'>Creating front on type</p>
            
          </div>
            <p className='text-xl font-semibold text-text'>Front Name</p>
            <input className='text-text bg-background rounded py-2 px-4 font-semibold' type="text" value={frontNameInput} onChange={handleFrontNameInput}/>

            <div className='flex flex-col gap-2'>
            <p className='text-lg text-text font-semibold'>Change font color code</p>
            <ColorPicker onClick={handleFrontColor}/>
            <div>
              {frontColorInput ? (
                <p className='ml-5 text-lg font-semibold text-text flex flex-row gap-2 items-center'>
                  Color set
                  <CheckCircleOutline />
                  <span className='bg-background p-1 rounded'>
                    {frontColorInput}
                  </span>
                </p>
              ) : (
                <p className='ml-5 text-lg font-semibold text-text flex flex-row gap-2 items-center' >
                  No color selected
                  <CancelOutlined />
                </p>
                )}
            </div>
            <Button text='Create new front' icon={AddRounded} onClick={handleCreateNewFront} loading={loading}/>
            </div>
        </div>
    );
};

export default FrontsCreator;