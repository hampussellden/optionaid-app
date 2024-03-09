'use client';
import { createContext, useEffect, useState } from 'react';
import {
  Project,
  KitchenType,
  Apartment,
  CreationMessage,
  ProjectWithoutId,
  KitchenTypeWithoutId,
  ApartmentWithoutId,
  New_Apartment,
} from '@/app/types';
import { createClient } from '@/utilities/supabase/client';
import { apartmentsInteriorDeep, kitchenTypesAllData } from '@/utilities/helpers/supabaseSelect';

export type ProjectsContextType = {
  projects: Project[];
  addProject: (project: ProjectWithoutId) => Promise<CreationMessage>;
  updateProject: (project: Project) => Promise<CreationMessage>;
  kitchenTypes: KitchenType[];
  addKitchenType: (kitchenType: KitchenTypeWithoutId) => Promise<CreationMessage>;
  updateKitchenType: (kitcenType: KitchenType) => Promise<CreationMessage>;
  apartments: Apartment[];
  addApartment: (apartment: ApartmentWithoutId) => Promise<CreationMessage>;
  updateApartment: (apartment: Apartment) => Promise<CreationMessage>;
};

export const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

const ProjectsProvider = ({ children }: { children: any }) => {
  const supabase = createClient();
  const [projects, setProjects] = useState<Project[]>([]);
  const [kitchenTypes, setKitchenTypes] = useState<KitchenType[]>([]);
  const [apartments, setApartments] = useState<Apartment[]>([]);

  const addProject = async (project: ProjectWithoutId): Promise<CreationMessage> => {
    const { data, error } = await supabase.from('projects').insert({ name: project.name }).select();

    if (error) {
      return { message: 'Error creating project', type: 'error' };
    }

    if (data) {
      let latestProject: Project = {
        id: data[0].id,
        name: project.name,
      };
      setProjects((prevProjects) => [...prevProjects, latestProject]);
      return { message: 'Project created successfully', type: 'success' };
    }
    return { message: 'Something went wrong', type: 'error' };
  };

  const updateProject = async (project: Project): Promise<CreationMessage> => {
    const { data, error } = await supabase.from('projects').update({ name: project.name }).eq('id', project.id);

    if (error) {
      return { message: 'Error updating project', type: 'error' };
    }

    if (data) {
      const updatedProject: Project = {
        id: project.id,
        name: project.name,
      };
      let newState = [...projects];
      let index = newState.findIndex((item) => item.id === project.id);
      newState[index].id = updatedProject.id;
      newState[index].name = updatedProject.name;
      setProjects(newState);
      return { message: 'Project updated successfully', type: 'success' };
    }
    return { message: 'Something went wrong', type: 'error' };
  };

  const addKitchenType = async (kitchenType: KitchenTypeWithoutId): Promise<CreationMessage> => {
    const { data, error } = await supabase.from('kitchen_types').insert(kitchenType).select();

    if (error) {
      return { message: 'Error creating kitchen type', type: 'error' };
    }

    if (data) {
      let latestKitchenType: KitchenType = {
        id: data[0].id,
        name: kitchenType.name,
        project_id: kitchenType.project_id,
        standard_front_id: kitchenType.standard_front_id,
        standard_worktop_id: kitchenType.standard_worktop_id,
      };
      setKitchenTypes((prevKitchenTypes) => [...prevKitchenTypes, latestKitchenType]);
      return { message: 'Kitchen type created successfully', type: 'success' };
    }
    return { message: 'Something went wrong', type: 'error' };
  };

  const updateKitchenType = async (kitchenType: KitchenType): Promise<CreationMessage> => {
    const { data, error } = await supabase
      .from('kitchen_types')
      .update({
        name: kitchenType.name,
        standard_front_id: kitchenType.standard_front_id,
        standard_worktop_id: kitchenType.standard_worktop_id,
      })
      .eq('id', kitchenType.id)
      .select();
    if (error) return { message: 'Error updating kitchen type', type: 'error' };
    if (data) {
      let newState = [...kitchenTypes];
      let index = newState.findIndex((item) => item.id === kitchenType.id);
      newState[index].name = kitchenType.name;
      newState[index].standard_front_id = kitchenType.standard_front_id;
      newState[index].standard_worktop_id = kitchenType.standard_worktop_id;
      setKitchenTypes(newState);
      return { message: 'Kitchen type updated successfully', type: 'success' };
    }
    return { message: 'Something went wrong', type: 'error' };
  };

  const addApartment = async (apartment: New_Apartment): Promise<CreationMessage> => {
    const { data, error } = await supabase.from('apartments').insert(apartment).select();

    if (error) return { message: 'Error creating apartment', type: 'error' };
    if (data) {
      let latestApartment: Apartment = {
        id: data[0].id,
        kitchen_type_id: apartment.kitchen_type_id,
        user_id: null,
        name: apartment.name,
        front_option_id: null,
        worktop_option_id: null,
        ready_for_order: false,
        total_cost: 0,
      };
      setApartments((prevApartments) => [...prevApartments, latestApartment]);
      return { message: 'Apartment created successfully', type: 'success' };
    }
    return { message: 'Something went wrong', type: 'error' };
  };
  const updateApartment = async (apartment: Apartment): Promise<CreationMessage> => {
    const { data, error } = await supabase.from('apartments').update(apartment).eq('id', apartment.id).select();
    if (error) return { message: 'Error updating apartment', type: 'error' };
    if (data) {
      let newState = [...apartments];
      let index = newState.findIndex((item) => item.id === apartment.id);
      newState[index] = apartment;
      setApartments(newState);
      return { message: 'Apartment updated successfully', type: 'success' };
    }
    return { message: 'Something went wrong', type: 'error' };
  };

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      const { data: projects, error } = await supabase.from('projects').select('*');

      if (error) {
        return;
      }

      if (projects) {
        setProjects(projects as Project[]);
      }
    };
    fetchProjects();
  }, []);

  // Fetch kitchen types
  useEffect(() => {
    const fetchKitchenTypes = async () => {
      const { data: kitchenTypes, error } = await supabase.from('kitchen_types').select(kitchenTypesAllData);

      if (error) {
        return;
      }

      if (kitchenTypes) {
        setKitchenTypes(kitchenTypes as KitchenType[]);
      }
    };
    fetchKitchenTypes();
  }, []);

  // Fetch apartments
  useEffect(() => {
    const fetchApartments = async () => {
      const { data: apartments, error } = await supabase.from('apartments').select(apartmentsInteriorDeep);

      if (error) {
        return;
      }

      if (apartments) {
        setApartments(apartments as Apartment[]);
      }
    };
    fetchApartments();
  });

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        kitchenTypes,
        addKitchenType,
        updateKitchenType,
        apartments,
        addApartment,
        updateApartment,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsProvider;
