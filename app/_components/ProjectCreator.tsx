'use client';
import React, { useState, useContext } from 'react';
import { createClient } from '@/utils/supabase/client';
import Button from './Button';
import { SaveRounded } from '@mui/icons-material';
import Box from './Box';
import { MessagesContext, MessagesContextType } from '../admin/context/MessagesContext';

type ProjectCreatorProps = {
  update: () => void;
};

const ProjectCreator = (props: ProjectCreatorProps) => {
  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const { addMessage } = useContext(MessagesContext) as MessagesContextType;

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    setInputValue(e.target.value);
  };
  const handleCreateNewProject = async () => {
    if (inputValue.length < 5) {
      addMessage({ message: 'A project name must be at least 5 characters long', type: 'error' });
      return;
    }
    const createNewProject = async () => {
      const { data, error } = await supabase
        .from('projects')
        .insert([{ name: inputValue }])
        .select();

      if (error) {
        addMessage({ message: 'Error creating project', type: 'error' });
        setLoading(false);
      }
      if (data) {
        addMessage({ message: 'Project created successfully', type: 'success' });
        setLoading(false);
        props.update();
      }
    };
    setLoading(true);
    createNewProject();
  };
  return (
    <Box grow primary>
      <h4 className="text-2xl font-bold">Creating new project</h4>

      <div className="flex flex-row  items-center gap-2">
        <p className="text-lg font-semibold text-text">Project Name</p>
        <input
          type="text"
          title="Project name"
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
