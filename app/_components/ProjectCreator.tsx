'use client'
import React, { useState,useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Project, CreationMessage } from '@/app/types';
import classNames from 'classnames';

const ProjectCreator = () => {
  const supabase = createClient();
  const [inputValue, setInputValue] = useState<string>('')
  const [message, setMessage] = useState<CreationMessage | null>(null)

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    setInputValue(e.target.value)
  }
  const handleCreateNewProject = async () => {
    if (inputValue.length < 5) {
      setMessage({message:'A project name must be at least 5 characters long', type:'error'})
      return
    }
    const createNewProject = async () => { 
      const { data, error } = await supabase
      .from('projects')
      .insert([
        { name: inputValue,},
      ])
      .select()

      if (error) console.log('error', error)
      if (data) setMessage({message:'Project created successfully', type: 
      'success'})    }
    createNewProject()
  }
/* {classNames({'text-accent' : message.type == 'error', : 'text-secondary': message.type == 'success'}, 'text-lg font-semibold')} */
    return (
      <div className='w-full h-fill  flex flex-col p-4 bg-primary rounded items-start gap-6'>
        <h4 className='text-2xl font-bold'>Creating new project</h4>
        {message && <p className={classNames({'text-accent' : message.type == 'error','text-secondary': message.type == 'success'}, 'text-lg font-semibold')}>{message.message}</p> }
        <div className='flex flex-row  items-center gap-2'>
          <p className='text-lg font-semibold text-text'>Project Name</p>
          <input type="text" value={inputValue} className='px-4 py-2 text-xl font-semibold rounded text-text bg-background focus:outline outline-accent' onChange={handleInputChange}/>
        </div>
        <button className='rounded bg-accent py-2 px-4 text-xl w-fit font-semibold self-end justify-self-end hover:bg-accentHover' onClick={handleCreateNewProject}>Save new project</button>
      </div>
    );
};

export default ProjectCreator;