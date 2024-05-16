'use client';
import React, { useState, useContext } from 'react';
import { createClient } from '@/utilities/supabase/client';
import Button from './Button';
import { SaveRounded } from '@mui/icons-material';
import Box from './Box';
import { MessagesContext, MessagesContextType } from '../app/admin/context/MessagesContext';
import Flex from '@/containers/Flex';
import Text from './Text';

type ProjectCreatorProps = {
  // update: () => void;
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
        // props.update();
      }
    };
    setLoading(true);
    createNewProject();
  };
  return (
    <Flex as="section" direction="column" classNames='w-full p-2' justify='between' align='stretch' gap={4}>
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
