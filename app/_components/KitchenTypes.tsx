'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Project, KitchenType } from '@/app/types';
import Apartments from './Apartments';
import KitchenTypesCreator from './KitchenTypesCreator';
import classNames from 'classnames';
import KitchenTypesEditor from './KitchenTypesEditor';
import MenuItem from './MenuItem';
import { AddRounded } from '@mui/icons-material';

export type KitchenTypesProps = {
  project: Project;
  handleProjectEditorClose: () => void;
};

const KitchenTypes = (props: KitchenTypesProps) => {
  const [kitchenTypes, setKitchenTypes] = useState<KitchenType[] | null>(null);
  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<KitchenType | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);

  useEffect(() => {
    const fetchKitchenTypes = async () => {
      const { data: kitchenTypes } = await supabase
        .from('kitchen_types')
        .select('*,worktops(*),fronts(*)')
        .eq('project_id', props.project.id)
        .order('id', { ascending: true });
      setKitchenTypes(kitchenTypes as KitchenType[]);
    };
    fetchKitchenTypes();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [selectedType]);

  const handleTypeEditorClose = () => {
    setEditing(false);
  };
  const handleSelectType = async (kitchenType: KitchenType) => {
    setSelectedType(kitchenType);
    setLoading(true);
  };
  const handleTypeClick = (kitchenType: KitchenType) => {
    if (selectedType?.id === kitchenType.id) return;
    setEditing(true);
    setCreating(false);
    handleSelectType(kitchenType);
    props.handleProjectEditorClose();
  };
  const handleOpenKitchenTypeCreator = () => {
    setEditing(false);
    setCreating(true);
    setSelectedType(null);
    props.handleProjectEditorClose();
  };
  return (
    <>
      <div className="flex flex-col items-start min-w-fit rounded bg-static p-4  gap-1 scroll-smooth scrollbar-thin scrollbar-track-static scrollbar-thumb-static scrollbar-track-rounded scrollbar-thumb-rounded overflow-y-auto">
        <ul>
          {kitchenTypes &&
            kitchenTypes.map((kitchenType: any) => (
              <MenuItem
                active={selectedType?.id === kitchenType.id ? true : false}
                key={kitchenType.id}
                onClick={() => handleTypeClick(kitchenType)}
                text={'type ' + kitchenType.name}
              />
            ))}
          <MenuItem
            active={creating}
            key={'new'}
            onClick={handleOpenKitchenTypeCreator}
            text={'new type'}
            icon={AddRounded}
          />
        </ul>
      </div>
      {selectedType && !loading && (
        <Apartments project={props.project} kitchenType={selectedType} handleTypeEditorClose={handleTypeEditorClose} />
      )}

      {editing && selectedType && <KitchenTypesEditor kitchenType={selectedType} project={props.project} />}
      {creating && <KitchenTypesCreator project={props.project} />}
    </>
  );
};

export default KitchenTypes;
