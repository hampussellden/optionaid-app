'use client';
import React, { useState, useContext } from 'react';
import { KitchenType, Project } from '@/app/types';
import FrontOptionsEditor from '@/components/FrontOptionsEditor';
import WorktopOptionsEditor from '@/components/WorktopOptionsEditor';
import Button from '@/components/Button';
import { SaveRounded } from '@mui/icons-material';
import { MessagesContext, MessagesContextType } from '../app/admin/context/MessagesContext';
import Text from '@/components/Text';
import Flex from '@/Containers/Flex';
import { ProjectsContext, ProjectsContextType } from '@/app/admin/context/ProjectsContext';

export type KitchenTypesEditorProps = {
  kitchenType: KitchenType;
  project: Project;
};

const KitchenTypesEditor = (props: KitchenTypesEditorProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { addMessage } = useContext(MessagesContext) as MessagesContextType;
  const {updateKitchenType} = useContext(ProjectsContext) as ProjectsContextType;
  // state to hold input value for kitchen type name and price change
  const [typeNameInputValue, setTypeNameInputValue] = useState<string>('');

  const handleTypeNameInputChange = (e: React.ChangeEvent<any>) => {
    setTypeNameInputValue(e.target.value);
  };
  // handle update of kitchen type name
  const handleTypeUpdate = () => {
    if (typeNameInputValue.length < 1) {
      addMessage({ message: 'A kitchen type must have a name', type: 'error' });
      setLoading(false);
      return;
    }
    updateKitchenType({
      ...props.kitchenType,
      id: props.kitchenType.id,
      name: typeNameInputValue,
    });
  };

  return (
    <Flex direction="column" align="stretch" gap={2}>
      <Flex direction="column" align="stretch" gap={1} classNames="bg-primary px-1 py-2 rounded">
        <Flex justify="between" classNames="w-full">
          <Text as="h4" size="small">
            Editing Kitchen Type
          </Text>
          <Text as="p" size="medium">
            {props.project.name} - type {props.kitchenType.name}
          </Text>
        </Flex>
        <Flex direction="column" gap={1}>
          <Text as="p" size="medium">
            Type Name
          </Text>
          <input
            className="bg-background text-text p-0.5 rounded max-w-[20ch]"
            type="text"
            title="Kitchen type name"
            value={typeNameInputValue}
            onChange={handleTypeNameInputChange}
          />
        </Flex>
      </Flex>
      <Button
        text="Save Changes"
        onClick={handleTypeUpdate}
        loading={loading}
        icon={SaveRounded}
        marginZero
      />
      
      <FrontOptionsEditor kitchenType={props.kitchenType} />
      <WorktopOptionsEditor kitchenType={props.kitchenType} />

    </Flex>
  );
};

export default KitchenTypesEditor;
