'use client';
import React, { useState, useContext } from 'react';
import { createClient } from '@/utils/supabase/client';
import { KitchenType, Project } from '@/app/types';
import FrontOptionsEditor from './FrontOptionsEditor';
import WorktopOptionsEditor from './WorktopOptionsEditor';
import Button from './Button';
import { SaveRounded } from '@mui/icons-material';
import Box from './Box';
import { MessagesContext, MessagesContextType } from '../admin/context/MessagesContext';

export type KitchenTypesEditorProps = {
  kitchenType: KitchenType;
  project: Project;
};

const KitchenTypesEditor = (props: KitchenTypesEditorProps) => {
  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(false);
  const { addMessage } = useContext(MessagesContext) as MessagesContextType;
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
    const updateKitchenType = async () => {
      const { data, error } = await supabase
        .from('kitchen_types')
        .update({ name: typeNameInputValue })
        .eq('id', props.kitchenType.id)
        .select();
      if (error) {
        addMessage({ message: 'Error updating kitchen type', type: 'error' });
        setLoading(false);
      }
      if (data) {
        addMessage({ message: 'Kitchen type updated successfully', type: 'success' });
        setLoading(false);
      }
    };
    updateKitchenType();
  };

  return (
    <Box primary grow>
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold">Editing kitchen type</h2>
        <p className="text-xl font-semibold ml-auto">
          {props.project.name} - type {props.kitchenType.name}
        </p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <p className="text-lg font-bold text-text">Type Name</p>
        <input
          className="bg-background text-text p-2 rounded"
          type="text"
          title="Kitchen type name"
          value={typeNameInputValue}
          onChange={handleTypeNameInputChange}
        />
      </div>
      <hr className="border-background"></hr>
      <FrontOptionsEditor kitchenType={props.kitchenType} />
      <hr className="border-background"></hr>
      <WorktopOptionsEditor kitchenType={props.kitchenType} />
      <hr className="border-background"></hr>
      <Button
        text="Save Changes"
        onClick={() => {
          setLoading(true), handleTypeUpdate();
        }}
        loading={loading}
        icon={SaveRounded}
      />
    </Box>
  );
};

export default KitchenTypesEditor;
