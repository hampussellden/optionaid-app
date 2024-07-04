'use client';
import React, { useEffect, useState, useContext } from 'react';
import { Project } from '@/app/types';
import { Front, Worktop } from '@/app/types';
import Button from './Button';
import { AddRounded } from '@mui/icons-material';
import { MessagesContext, MessagesContextType } from '../app/admin/context/MessagesContext';
import Text from './Text';
import Flex from '@/Containers/Flex';
import { ProjectsContext, ProjectsContextType } from '@/app/admin/context/ProjectsContext';
import { FrontsContext, FrontsContextType } from '@/app/admin/context/FrontsContext';
import { WorktopContextType, WorktopsContext } from '@/app/admin/context/WorktopsContext';

export type KitchenTypesCreatorProps = {
  project: Project;
};

const KitchenTypesCreator = (props: KitchenTypesCreatorProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [standardFront, setStandardFront] = useState<Front | null>(null);
  const [standardWorktop, setStandardWorktop] = useState<Worktop | null>(null);
  const { addMessage } = useContext(MessagesContext) as MessagesContextType;
  const {addKitchenType} = useContext(ProjectsContext) as ProjectsContextType;
  const {frontTypes,fronts} = useContext(FrontsContext) as FrontsContextType;
  const {worktopTypes,worktops} = useContext(WorktopsContext) as WorktopContextType;

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    setInputValue(e.target.value);
  };

  const handleCreateNewKitchenType = async () => {
    setLoading(true);
    if (inputValue.length < 1) {
      addMessage({ message: 'A kitchen type must have a name', type: 'error' });
      setLoading(false);
      return;
    }
    addKitchenType({
      project_id: props.project.id,
      name: inputValue,
      standard_front_id: standardFront?.id || 1,
      standard_worktop_id: standardWorktop?.id || 1,
    });
    setLoading(false);
  };

  const handleStandardFront = (event: React.ChangeEvent<HTMLSelectElement>) => {
    fronts?.filter((front: Front) => {
      if (front.id === parseInt(event.target.value)) {
        setStandardFront(front);
      }
    });
  };
  const handleStandardWorktop = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    worktops?.filter((worktop: Worktop) => {
      if (worktop.id === parseInt(event.target.value)) {
        setStandardWorktop(worktop);
      }
    });
  };
  return (
    <Flex direction='column' gap={2}>
      <Flex direction='column' classNames='bg-primary rounded p-2' gap={2} width='full'>
        <Flex width='full' align='center' justify='between'>
        <Text as="h4" size="small">
          Creating New Kitchen Type
        </Text>
        <Text as="p" size="small">
          {props.project.name}
        </Text>
        </Flex>
        <Flex align='center' gap={2} >
          <Text as="p" size="medium">Kitchen Type Name</Text>
          <input
            type="text"
            title="Kitchen type name"
            value={inputValue}
            className="bg-background text-text p-0.5 rounded"
            onChange={handleInputChange}
          />
        </Flex>
        <Flex align='center' gap={2}>
          <Text as='p' size='medium'>Standard Front</Text>
          <select
            className="bg-background text-text p-0.5 rounded"
            name="standard-front-picker"
            id="standard-front-picker"
            aria-label="Choose Standard Front"
            title="Choose Standard Front"
            value={standardFront?.id}
            onChange={handleStandardFront}
            >
            {fronts &&
              fronts.map((front: Front, index: number) => (
                <option value={front.id} selected={index == 0 ? true : false} key={front.id}>
                  {front.front_types?.name + ' ' + front.name}
                </option>
              ))}
          </select>
        </Flex>
        <Flex align='center' gap={2}>
          <Text as='p' size='medium'>Standard Worktop</Text>
          <select
            className="bg-background text-text p-0.5 rounded"
            name="standard-worktop-picker"
            id="standard-worktop-picker"
            aria-label="Choose Standard Worktop"
            title="Choose Standard Worktop"
            value={standardWorktop?.id}
            onChange={handleStandardWorktop}
          >
            {worktops &&
              worktops.map((worktop: Worktop, index: number) => (
                <option value={worktop.id} selected={index == 0 ? true : false} key={worktop.id}>
                  {worktop.worktop_types?.make + ' ' + worktop.name}
                </option>
              ))}
          </select>
        </Flex>
      </Flex>
      <Button fullWidth icon={AddRounded} text="Save new Type" onClick={handleCreateNewKitchenType} loading={loading} />
    </Flex>
  );
};

export default KitchenTypesCreator;
