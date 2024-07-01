'use client';
import React, { useState, useContext } from 'react';
import Button from './Button';
import { SaveRounded } from '@mui/icons-material';
import { MessagesContext, MessagesContextType } from '../app/admin/context/MessagesContext';
import Flex from '@/Containers/Flex';
import Text from './Text';
import { ProjectsContext, ProjectsContextType } from '@/app/admin/context/ProjectsContext';

const ProjectCreator = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const { addMessage } = useContext(MessagesContext) as MessagesContextType;
  const {addProject} = useContext(ProjectsContext) as ProjectsContextType;

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    setInputValue(e.target.value);
  };
  const handleCreateNewProject = async () => {
    setLoading(true);
    if (inputValue.length < 5) {
      addMessage({ message: 'A project name must be at least 5 characters long', type: 'error' });
      setLoading(false);
      return;
    }
    addProject({ name: inputValue });
    setLoading(false);
  };
  
  return (
    <Flex as="section" direction="column" classNames='p-2' justify='between' align='stretch' gap={4} width='full'>
      <Flex direction="column" classNames='bg-primary w-full rounded p-2' gap={1}>
        <Text as="h4" size='medium'>
          Creating new project
        </Text>
        <Flex align='center' gap={2}>
          <Text as="p" size="small">Project Name</Text>
          <input
            type="text"
            title="Project name"
            value={inputValue}
            className="bg-static text-text p-0.5 rounded"
            onChange={handleInputChange}
          />
        </Flex>
      </Flex>
      <Button fullWidth text="Save new project" onClick={handleCreateNewProject} icon={SaveRounded} loading={loading} />
    </Flex>
  );
};

export default ProjectCreator;
