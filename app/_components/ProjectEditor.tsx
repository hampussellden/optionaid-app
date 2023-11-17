'use client';
import React, { useState, useEffect, useContext } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Project } from '../types';
import Button from './Button';
import { SaveRounded } from '@mui/icons-material';
import ReactCSV from './ReactCSV';
import Box from './Box';
import { MessagesContext, MessagesContextType } from '../admin/context/MessagesContext';

export type ProjectEditorProps = {
  project: Project;
  update: () => void;
};

const ProjectEditor = (props: ProjectEditorProps) => {
  const supabase = createClient();
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [exportableProject, setExportableProject] = useState<Project | null>(null);
  const { addMessage } = useContext(MessagesContext) as MessagesContextType;
  const handleInputChange = (e: React.ChangeEvent<any>) => {
    setInputValue(e.target.value);
  };

  const handleProjectUpdate = async () => {
    if (inputValue.length < 5) {
      addMessage({ message: 'A project name must be at least 5 characters long', type: 'error' });
      return;
    }
    const updateProject = async () => {
      const { data, error } = await supabase
        .from('projects')
        .update({ name: inputValue })
        .eq('id', props.project.id)
        .select();
      if (error) {
        addMessage({ message: 'Error updating project', type: 'error' });
        setLoading(false);
      }
      if (data) {
        addMessage({ message: 'Project updated successfully', type: 'success' });
        setLoading(false);
        props.update();
      }
    };
    setLoading(true);
    updateProject();
  };
  useEffect(() => {
    const fetchExportableProject = async () => {
      const { data: exportableProject, error } = await supabase
        .from('projects')
        .select('*, kitchen_types(*,apartments(*,users(*)))')
        .eq('id', props.project.id)
        .single();
      if (error) {
        addMessage({ message: 'Error fetching project CSV', type: 'error' });
      }
      if (exportableProject) {
        setExportableProject(exportableProject as Project);
      }
    };
    fetchExportableProject();
  }, [props.project]);

  return (
    <Box grow primary>
      <div className="flex flex-row justify-between">
        <h4 className="text-2xl font-bold">Editing Project</h4>
        <p className="text-xl font-semibold ml-auto">{props.project.name}</p>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <p className="text-lg font-bold text-text">Project Name</p>
        <input
          className="bg-background text-text p-2 rounded"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <div className="mt-auto flex flex-row justify-between">
        {exportableProject && <ReactCSV project={exportableProject} />}
        <Button text="Save Changes" onClick={handleProjectUpdate} loading={loading} icon={SaveRounded} />
      </div>
    </Box>
  );
};

export default ProjectEditor;
