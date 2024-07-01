'use client';
import { AppContext, AppContextType } from '@/app/admin/context/AppContext';
import { ProjectsContext, ProjectsContextType } from '@/app/admin/context/ProjectsContext';
import { MessagesContext, MessagesContextType } from '@/app/admin/context/MessagesContext';
import { createClient } from '@/utilities/supabase/client';
import { useContext, useEffect, useState } from 'react';
import { KitchenType, Project } from '@/app/types';
import { AddRounded, HouseOutlined, KitchenRounded, KitchenTwoTone, SaveRounded } from '@mui/icons-material';
import ReactCSV from '@/components/ReactCSV';
import Button from '@/components/Button';
import Flex from '@/Containers/Flex';
import ItemList from '@/components/ItemList';
import { sortByName } from '@/utilities/helpers/sorting';
import MenuItem from '@/components/MenuItem';
import KitchenTypesEditor from '@/blocks/KitchenTypesEditor';
import ApartmentEditor from '@/blocks/ApartmentsEditor';
import KitchenTypesCreator from '@/components/KitchenTypesCreator';
import Text from '@/components/Text';
import ApartmentsCreator from '@/components/ApartmentsCreator';
import ProjectEditor from '@/components/ProjectEditor';

const EditProject = () => {
  const supabase = createClient();
  const { kitchenTypes, apartments } = useContext(ProjectsContext) as ProjectsContextType;
  const {
    state,
    selectedProject,
    selectedKitchenType,
    selectedApartment,
    changeAppState,
    changeSelectedKitchenType,
    changeSelectedApartment,
  } = useContext(AppContext) as AppContextType;
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [exportableProject, setExportableProject] = useState<Project | null>(null);
  const [creatingKitchenType, setCreatingKitchenType] = useState<boolean>(false);
  const [creatingApartment, setCreatingApartment] = useState<boolean>(false);
  const { addMessage } = useContext(MessagesContext) as MessagesContextType;
  const handleInputChange = (e: React.ChangeEvent<any>) => {
    setInputValue(e.target.value);
  };

  const handleProjectUpdate = async () => {
    if (!selectedProject) return;
    if (inputValue.length < 5) {
      addMessage({ message: 'A project name must be at least 5 characters long', type: 'error' });
      return;
    }
    const updateProject = async () => {
      const { data, error } = await supabase
        .from('projects')
        .update({ name: inputValue })
        .eq('id', selectedProject.id)
        .select();
      if (error) {
        addMessage({ message: 'Error updating project', type: 'error' });
        setLoading(false);
      }
      if (data) {
        addMessage({ message: 'Project updated successfully', type: 'success' });
        setLoading(false);
      }
    };
    setLoading(true);
    updateProject();
  };

  const handleSelectKitchenType = (kitchenType: KitchenType) => {
    changeSelectedKitchenType(kitchenType);
    changeSelectedApartment(null);
    setCreatingKitchenType(false);
  };
  const handleCreateNewKitchenType = () => {
    changeSelectedKitchenType(null);
    changeSelectedApartment(null);
    setCreatingKitchenType(true);
  };
  const handleCreateNewApartment = () => {
    changeSelectedApartment(null);
    setCreatingKitchenType(false);
    setCreatingApartment(true);
  };
  return (
    <>
      <nav id="secondary-navigation" className="w-full">
        {selectedProject && (
          <ItemList horizontal classNames={'py-4 px-2 bg-static border-b border-text  sticky w-full'}>
            {kitchenTypes &&
              kitchenTypes
                .filter((kitchenType: KitchenType) => kitchenType.project_id === selectedProject.id)
                .sort(sortByName)
                .map((kitchenType: any, key: number) => (
                  <MenuItem
                    active={selectedKitchenType?.id === kitchenType.id ? true : false}
                    key={key}
                    onClick={() => handleSelectKitchenType(kitchenType)}
                    text={'type ' + kitchenType.name}
                    icon={selectedKitchenType?.id === kitchenType.id ? KitchenTwoTone : KitchenRounded}
                  />
                ))}
            <MenuItem onClick={handleCreateNewKitchenType} icon={AddRounded} text="Kitchen Type" />
          </ItemList>
        )}
        {/* Apartments */}
        {selectedProject && selectedKitchenType && (
          <ItemList
            horizontal
            classNames="py-4 px-2 bg-static border border-text border-t-0 border-l-0 sticky w-full overflow-auto"
          >
            {apartments &&
              apartments
                .filter((apartment) => apartment.kitchen_type_id === selectedKitchenType.id).sort(sortByName)
                .map((apartment, key) => (
                  <MenuItem
                    key={key}
                    icon={HouseOutlined}
                    text={apartment.name}
                    onClick={() => changeSelectedApartment(apartment)}
                    active={selectedApartment?.id === apartment.id}
                  />
                ))}
            <MenuItem onClick={handleCreateNewApartment} icon={AddRounded} text="Apartment" />
          </ItemList>
        )}
      </nav>

      <Flex id="project-editor" as="section" direction="column" classNames="h-full max-h-full overflow-auto p-2" width='full'>
        {creatingKitchenType && selectedProject && <KitchenTypesCreator project={selectedProject} />}
        {selectedProject && !selectedKitchenType && !creatingKitchenType && (
            <ProjectEditor />
        )}
        {selectedProject && selectedKitchenType && !selectedApartment && !creatingApartment && (
          <KitchenTypesEditor kitchenType={selectedKitchenType} project={selectedProject} />
        )}
        {selectedProject && selectedKitchenType && selectedApartment && (
          <ApartmentEditor project={selectedProject} kitchenType={selectedKitchenType} apartment={selectedApartment} />
        )}
        {creatingApartment && selectedKitchenType && <ApartmentsCreator kitchenType={selectedKitchenType} />}
        {/* Placeholder */}
        {!selectedProject && (
          <Flex align="center" justify="center" classNames="h-full">
            <Text as="h2" size="small">
              Select a project to edit
            </Text>
          </Flex>
        )}
      </Flex>
    </>
  );
};
export default EditProject;
