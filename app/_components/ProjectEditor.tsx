'use client'
import React, {useState} from 'react';
import { createClient } from '@/utils/supabase/client';
const ProjectEditor = () => {
  const supabase = createClient();
  const [inputValue, setInputValue] = useState<string>('')
  const handleInputChange = (e: React.ChangeEvent<any>) => {
    setInputValue(e.target.value)
  }
  return (
      <div className='w-full h-fill flex flex-col p-4 bg-primary rounded gap-6 justify-start'>
          <h4 className='text-2xl font-bold'>Editing Project</h4>
        <div className='flex flex-row gap-2 items-center'>
          <p className='text-lg font-bold text-text'>Project Name</p>
          <input className='bg-background text-text p-2 rounded' type="text" value={inputValue} onChange={handleInputChange}/>
        </div>
        <button className='self-end mt-auto py-2 px-4 rounded text-lg font-bold bg-accent hover:bg-accentHover'>Save Changes</button>
      </div>
  );
};

export default ProjectEditor;