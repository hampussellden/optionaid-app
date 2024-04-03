'use client';
import React, { useState, useContext } from 'react';
import { createClient } from '@/utilities/supabase/client';
import { Apartment, KitchenType, Project } from '../app/types';
import Button from './Button';
import { SaveRounded } from '@mui/icons-material';
import ReactCSV from './ReactCSV';
import Box from './Box';
import { MessagesContext, MessagesContextType } from '../app/admin/context/MessagesContext';
import { TotalCostOnProject } from '@/utilities/helpers/counting';
import { ProjectsContext, ProjectsContextType } from '@/app/admin/context/ProjectsContext';

export type ProjectEditorProps = {
  project: Project;
  // update: () => void;
};

const ProjectEditor = (props: ProjectEditorProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { updateProject } = useContext(ProjectsContext) as ProjectsContextType;
  const { addMessage } = useContext(MessagesContext) as MessagesContextType;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleProjectUpdate = async () => {
    if (inputValue.length < 5) {
      addMessage({ message: 'A project name must be at least 5 characters long', type: 'error' });
      return;
    }
    setLoading(true);
    props.project.name = inputValue;
    addMessage(await updateProject(props.project));
    setLoading(false);
  };

  return (
    <Box grow primary>
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold">Editing Project</h2>
        <p className="text-xl font-semibold ml-auto">{props.project.name}</p>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <p className="text-lg font-bold text-text">Project Name</p>
        <input
          className="bg-background text-text p-2 rounded"
          type="text"
          name="Project name"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <p className="text-xl font-semibold">Total Cost: {TotalCostOnProject(props.project)} SEK</p>
      <div className="mt-auto flex flex-row justify-between">
        <ReactCSV project={props.project} />
        <Button text="Save Changes" onClick={handleProjectUpdate} loading={loading} icon={SaveRounded} />
      </div>
    </Box>
  );
};

export default ProjectEditor;
