'use client'
import React, {useState} from 'react';
import { createClient } from '@/utils/supabase/client';
import { Project } from '../admin/page';

export type KitchenTypesCreatorProps = {
  project: Project;
}

export type Front = {
  id: number;
  name: string;
  front_type_id: number;
  color: string;
}
export type Worktop = {
  id:number;
  worktop_type_id: number;
  color_code: string;
  name: string;
}
const KitchenTypesCreator = (props: KitchenTypesCreatorProps) => {
  const supabase = createClient();
  const [inputValue, setInputValue] = useState<string>('')
  const [standardFront, setStandardFront] = useState<Front | null>(null)
  const [standardWorktop, setStandardWorktop] = useState<Worktop | null>(null)

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    setInputValue(e.target.value)
  }

  const handleCreateNewKitchenType = async () => {
    const createNewKitchenType = async () => {  
      const { data, error } = await supabase
      .from('kitchen_types')
      .insert([
        { project_id: props.project.id, name: inputValue,
          standard_front_id: standardFront?.id,
          standard_worktop_id: standardWorktop?.id,
        },
      ])
      .select()


      if (error) console.log('error', error)
      if (data) console.log('data', data)      
    }
    createNewKitchenType()
  }

    return (
      <div className='self-end bg-slate-500 h-40 w-full p-8 flex flex-col'>
      <input type="text" value={inputValue} className='text-black' onChange={handleInputChange}/>
      <p>{inputValue}</p>
      <button className='bg-black' onClick={handleCreateNewKitchenType}>create new kitchentype</button>
    </div>
    );
};

export default KitchenTypesCreator;