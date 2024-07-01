'use client';
import React, { useState, useContext } from 'react';
import { Project } from '../app/types';
import Button from './Button';
import { SaveRounded } from '@mui/icons-material';
import ReactCSV from './ReactCSV';
import Box from './Box';
import { MessagesContext, MessagesContextType } from '../app/admin/context/MessagesContext';
import { TotalCostOnProject } from '@/utilities/helpers/counting';
import { ProjectsContext, ProjectsContextType } from '@/app/admin/context/ProjectsContext';
import { AppContext, AppContextType } from '@/app/admin/context/AppContext';
import Text from './Text';
import Flex from '@/Containers/Flex';

const ProjectEditor = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { updateProject } = useContext(ProjectsContext) as ProjectsContextType;
  const { addMessage } = useContext(MessagesContext) as MessagesContextType;
  const { selectedProject } = useContext(AppContext) as AppContextType;

  if (!selectedProject) return null;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleProjectUpdate = async () => {
    if (inputValue.length < 5) {
      addMessage({ message: 'A project name must be at least 5 characters long', type: 'error' });
      return;
    }
    setLoading(true);
    addMessage(await updateProject({ ...selectedProject, name: inputValue }));
    setLoading(false);
  };

  return (
    <Flex direction="column" gap={2} align="stretch">
      <Flex direction="column" gap={1} classNames="w-full p-2 rounded bg-primary">
        <Flex direction="row" gap={1} align="center" justify="between">
          <Text as="h4" size="small">
            Editing Project
          </Text>
          <Text as="p" size="medium">
            {selectedProject.name}
          </Text>
        </Flex>
        <Flex gap={1} direction="column" align="start">
          <Text as="p" size="medium">
            Project Name
          </Text>
          <input
            className="bg-background text-text rounded p-1 max-w-[30ch]"
            type="text"
            title="Project name"
            value={inputValue}
            onChange={handleInputChange}
          />
        </Flex>
      </Flex>
      <Flex gap={4} align="center" justify="center">
        {selectedProject && <ReactCSV project={selectedProject} />}
        <Button
          fullWidth
          text="Save Changes"
          onClick={handleProjectUpdate}
          loading={loading}
          icon={SaveRounded}
        />
      </Flex>
    </Flex>
  );
};

export default ProjectEditor;
