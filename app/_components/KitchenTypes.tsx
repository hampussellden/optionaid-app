'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Project, KitchenType } from '@/app/types';
import Apartments from './Apartments';
import KitchenTypesCreator from './KitchenTypesCreator';
import KitchenTypesEditor from './KitchenTypesEditor';
import MenuItem from './MenuItem';
import { AddRounded, KitchenRounded, KitchenTwoTone } from '@mui/icons-material';
import ItemList from './ItemList';
import Box from './Box';
import LoadingSpinner from './LoadingSpinner';

export type KitchenTypesProps = {
  project: Project;
  handleProjectEditorClose: () => void;
  key: number;
};

const KitchenTypes = (props: KitchenTypesProps) => {
  const supabase = createClient();
  const [kitchenTypes, setKitchenTypes] = useState<KitchenType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedType, setSelectedType] = useState<KitchenType | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const [apartmentsKey, setApartmentsKey] = useState(0);

  useEffect(() => {
    const fetchKitchenTypes = async () => {
      const { data: kitchenTypes } = await supabase
        .from('kitchen_types')
        .select('*,worktops(*,worktop_types(*)),fronts(*,front_types(*))')
        .eq('project_id', props.project.id)
        .order('id', { ascending: true });
      if (kitchenTypes) {
        setKitchenTypes(kitchenTypes as KitchenType[]);
        setLoading(false);
      }
    };
    fetchKitchenTypes();
  }, [loading]);

  useEffect(() => {
    setLoading(false);
  }, [selectedType]);

  const handleTypeEditorClose = () => {
    setEditing(false);
  };

  const handleTypeClick = (kitchenType: KitchenType) => {
    if (selectedType?.id === kitchenType.id) {
      setApartmentsKey((prevKey) => prevKey + 1);
      setEditing(true);
      return;
    }
    setEditing(true);
    setCreating(false);
    setSelectedType(kitchenType);
    setLoading(true);
    props.handleProjectEditorClose();
  };
  const handleOpenKitchenTypeCreator = () => {
    setEditing(false);
    setCreating(true);
    setSelectedType(null);
    props.handleProjectEditorClose();
  };

  const handleKitchenTypesLoading = () => {
    setLoading(true);
  };

  return (
    <>
      <Box>
        {loading ? (
          <LoadingSpinner size="small" />
        ) : (
          <ItemList>
            {kitchenTypes &&
              kitchenTypes.map((kitchenType: any) => (
                <MenuItem
                  active={selectedType?.id === kitchenType.id ? true : false}
                  key={kitchenType.id}
                  onClick={() => handleTypeClick(kitchenType)}
                  text={'type ' + kitchenType.name}
                  icon={selectedType?.id === kitchenType.id ? KitchenTwoTone : KitchenRounded}
                />
              ))}
            <MenuItem
              active={creating}
              key={'new'}
              onClick={handleOpenKitchenTypeCreator}
              text={'new type'}
              icon={AddRounded}
            />
          </ItemList>
        )}
      </Box>
      {selectedType && !loading && (
        <Apartments
          project={props.project}
          kitchenType={selectedType}
          handleTypeEditorClose={handleTypeEditorClose}
          key={apartmentsKey}
        />
      )}
      {editing && selectedType && (
        <KitchenTypesEditor kitchenType={selectedType} project={props.project} update={handleKitchenTypesLoading} />
      )}
      {creating && <KitchenTypesCreator project={props.project} update={handleKitchenTypesLoading} />}
    </>
  );
};

export default KitchenTypes;
