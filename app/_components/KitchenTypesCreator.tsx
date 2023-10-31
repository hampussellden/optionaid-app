'use client'
import React, {useEffect, useState} from 'react';
import { createClient } from '@/utils/supabase/client';
import { Project } from '@/app/types';
import classNames from 'classnames';
import { CreationMessage, Front, Worktop } from '@/app/types';


export type KitchenTypesCreatorProps = {
  project: Project;
}

const KitchenTypesCreator = (props: KitchenTypesCreatorProps) => {
  const supabase = createClient();
  const [fronts, setFronts] = useState<Front[] | null>(null)
  const [worktops, setWorktops] = useState<Worktop[] | null>(null)
  const [inputValue, setInputValue] = useState<string>('')
  const [standardFront, setStandardFront] = useState<Front | null>(null)
  const [standardWorktop, setStandardWorktop] = useState<Worktop | null>(null)
  const [message, setMessage] = useState<CreationMessage | null >(null)

  useEffect(() => {
    const fetchFrontsAndWorktops = async () => {
      const { data: fronts } = await supabase.from('fronts').select('*,front_types(*)')
      const { data: worktops } = await supabase.from('worktops').select('*,worktop_types(*)')
      setFronts(fronts as Front[])
      setWorktops(worktops as Worktop[])
    }
    fetchFrontsAndWorktops()
  },[])

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    setInputValue(e.target.value)
  }

  const handleCreateNewKitchenType = async () => {
    if (inputValue.length < 1) { setMessage({message:'A kitchen type must have a name', type: 'error'}); return }
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
      if (data) setMessage({message:'Kitchen type created successfully', type: 'success'})
    }
    createNewKitchenType()
  }
  const handleStandardFront = (event: React.ChangeEvent<HTMLSelectElement>) => {
    fronts?.filter((front: Front) => {
      if (front.id === parseInt(event.target.value)) {
        setStandardFront(front)
      }
    })
  };
  const handleStandardWorktop = (event: React.ChangeEvent<HTMLSelectElement>) => {
    worktops?.filter((worktop: Worktop) => {
      if (worktop.id === parseInt(event.target.value)) {
        setStandardWorktop(worktop)
      }
    })
  };
    return (
      <div className='w-full h-fill  flex flex-col p-4 bg-primary rounded items-start gap-6'>

        <h4 className='text-2xl font-bold' >Creating New Kitchen Type</h4>
        {message && <p className={classNames({'text-accent' : message.type == 'error','text-secondary': message.type == 'success'}, 'text-lg font-semibold')}>{message.message}</p> }
        <div className='flex flex-row items-center gap-2'>
          <p className='text-lg font-semibold text-text'>Type Name</p>
          <input type="text" value={inputValue} className='w-1/2 px-4 py-2 text-xl font-semibold rounded focus:outline outline-accent bg-background text-text' onChange={handleInputChange}/>
        </div>

        <div className='flex flex-row items-center gap-2'>
          <p className='text-lg font-semibold text-text'>Standard Front</p>
          <select className='rounded w-1/2 px-4 py-2 text-text font-semibold bg-background' name="standard-front-picker" id="standard-front-picker" value={standardFront?.id} onChange={handleStandardFront}>
            {fronts && fronts.map((front: Front) => (
              <option value={front.id} key={front.id}>{front.front_types.name + ' ' + front.name}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-row items-center gap-2'>
          <p className='text-lg font-semibold text-text'>Standard Worktop</p>
          <select className='rounded px-4 py-2 text-text font-semibold bg-background' name="standard-front-picker" id="standard-front-picker" value={standardWorktop?.id} onChange={handleStandardWorktop}>
            {worktops && worktops.map((worktop: Worktop) => (
              <option  value={worktop.id} key={worktop.id}>{worktop.worktop_types.make + ' ' + worktop.name}</option>
            ))}
          </select>
        </div>
        <button className='rounded bg-accent mt-auto py-2 px-4 text-xl w-fit font-semibold self-end hover:bg-accentHover' onClick={handleCreateNewKitchenType}>Create new kitchentype</button>
      </div>
    );
};

export default KitchenTypesCreator;