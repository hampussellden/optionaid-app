'use client'
import React, { useState,useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Project } from '../admin/page';

const ProjectCreator = () => {
  const supabase = createClient();
  const [inputValue, setInputValue] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    setInputValue(e.target.value)
  }
  const handleCreateNewProject = async () => {
    const createNewProject = async () => { 
      const { data, error } = await supabase
      .from('projects')
      .insert([
        { name: inputValue,},
      ])
      .select()

      if (error) console.log('error', error)
      if (data) console.log('data', data)      
    }
    createNewProject()
  }

    return (
      <div className='self-end bg-slate-500 h-40 w-full p-8 flex flex-col'>
        <input type="text" value={inputValue} className='text-black' onChange={handleInputChange}/>
        <p>{inputValue}</p>
        <button className='bg-black' onClick={handleCreateNewProject}>create new project</button>
      </div>
    );
};

export default ProjectCreator;