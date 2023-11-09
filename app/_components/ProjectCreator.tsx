'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Project, CreationMessage } from '@/app/types';
import classNames from 'classnames';
import Button from './Button';
import { SaveRounded } from '@mui/icons-material';
import Box from './Box';
import Message from './Message';

type ProjectCreatorProps = {
  update: () => void;
};

const ProjectCreator = (props: ProjectCreatorProps) => {
  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [message, setMessage] = useState<CreationMessage | null>(null);

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    setInputValue(e.target.value);
  };
  const handleCreateNewProject = async () => {
    if (inputValue.length < 5) {
      setMessage({ message: 'A project name must be at least 5 characters long', type: 'error' });
      return;
    }
    const createNewProject = async () => {
      const { data, error } = await supabase
        .from('projects')
        .insert([{ name: inputValue }])
        .select();

      if (error) console.log('error', error);
      if (data) {
        setMessage({ message: 'Project created successfully', type: 'success' });
        setLoading(false);
        props.update();
      }
    };
    setLoading(true);
    createNewProject();
  };
  /* {classNames({'text-accent' : message.type == 'error', : 'text-secondary': message.type == 'success'}, 'text-lg font-semibold')} */
  return (
    <Box grow primary>
      <h4 className="text-2xl font-bold">Creating new project</h4>

      <div className="flex flex-row  items-center gap-2">
        <p className="text-lg font-semibold text-text">Project Name</p>
        <input
          type="text"
          value={inputValue}
          className="px-4 py-2 text-xl font-semibold rounded text-text bg-background"
          onChange={handleInputChange}
        />
      </div>
      <Button text="Save new project" onClick={handleCreateNewProject} icon={SaveRounded} loading={loading} />
    </Box>
  );
};

export default ProjectCreator;
