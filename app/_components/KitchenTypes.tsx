'use client'
import React, {useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Project } from '../admin/page';
import Apartments from './Apartments';
import KitchenTypesCreator from './KitchenTypesCreator';

export type KitchenTypesProps = {
  project: Project;
  handleProjectEditorClose: () => void
} 
export type App_role = 'client' | 'admin'
export type User = {
  id: string;
  email: string;
  full_name: string;
  app_role: App_role;
};
export type KitchenType = {
  id: number;
  name: string | null;
  project_id: number;
  standard_front_id: number | null;
  standard_worktop_id: number | null;
  apartments?: any;
  fronts?: any;
  worktops?: any;
  users: any;
}


const KitchenTypes = (props: KitchenTypesProps) => {
  const [kitchenTypes, setKitchenTypes] = useState<KitchenType[] | null>(null);
  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<KitchenType | null>(null);
  const [editing , setEditing] = useState<boolean>(false)
  const [creating, setCreating] = useState<boolean>(false)

  useEffect(() => {
    const fetchKitchenTypes = async () => {
        const { data: kitchenTypes } = await supabase.from('kitchen_types').select('*,apartments(*,users(*)),worktops(*),fronts(*)').eq('project_id', props.project.id);
        setKitchenTypes(kitchenTypes as any)
    }
    fetchKitchenTypes();
  },[]);
  console.log('kitchenTypes', kitchenTypes)
  useEffect(() => {
    setLoading(false);
  },[selectedType]);

  const handleTypeEditorClose = () => {
    setEditing(false)
  }
  const handleSelectType = async (kitchenType: KitchenType) => {
    setSelectedType(kitchenType);
    setLoading(true);
  }
  const handleTypeClick = (kitchenType: KitchenType) =>{
    setEditing(true)
    setCreating(false)
    handleSelectType(kitchenType)
    props.handleProjectEditorClose()
  }
  const handleOpenKitchenTypeCreator = () => {
    setEditing(false)
    setCreating(true)
    setSelectedType(null)
    props.handleProjectEditorClose()
  }
    return (
      <>
        <div className='flex flex-col items-start min-w-fit'>
              {kitchenTypes && kitchenTypes.map((kitchenType: any) => (
                <button className={selectedType?.id == kitchenType.id ? 'bg-white text-black' : ''} onClick={() => handleTypeClick(kitchenType)} key={kitchenType.id}>type {kitchenType.name}</button>
                ))}
          
          <button onClick={handleOpenKitchenTypeCreator}> Add new Type + </button>
        </div>
          {selectedType && !loading && (
            <Apartments kitchenType={selectedType} handleTypeEditorClose={handleTypeEditorClose}/>
          )}

          {editing && (
            <div className='self-end bg-slate-500 h-40 w-full'>
              editing types here
            </div>
          )}
          {creating && (
            <KitchenTypesCreator project={props.project} />
          )}
        </>
    );
};

export default KitchenTypes;