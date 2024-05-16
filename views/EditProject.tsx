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
import Flex from '@/containers/Flex';
import ItemList from '@/components/ItemList';
import { sortByName } from '@/utilities/helpers/sorting';
import MenuItem from '@/components/MenuItem';
import KitchenTypesEditor from '@/blocks/KitchenTypesEditor';
import ApartmentEditor from '@/blocks/ApartmentsEditor';
import KitchenTypesCreator from '@/components/KitchenTypesCreator';
import Text from '@/components/Text';

const EditProject = () => {
  const supabase = createClient();
  const { kitchenTypes, apartments } = useContext(ProjectsContext) as ProjectsContextType;
  const {
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
  useEffect(() => {
    if (!selectedProject) return;
    const fetchExportableProject = async () => {
      const { data: exportableProject, error } = await supabase
        .from('projects')
        .select('*, kitchen_types(*,apartments(*,users(*)))')
        .eq('id', selectedProject.id)
        .single();
      if (error) {
        addMessage({ message: 'Error fetching project CSV', type: 'error' });
      }
      if (exportableProject) {
        setExportableProject(exportableProject as Project);
      }
    };
    fetchExportableProject();
  }, [selectedProject]);
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
    setCreatingApartment(true);
  };
  return (
    <>
      <nav id="secondary-navigation" className="w-full">
        {/* Kitchen Types */}
        {selectedProject && (
          <ItemList horizontal classNames={'py-4 px-2 bg-static sticky border border-text border-l-0 sticky w-full'}>
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
                .filter((apartment) => apartment.kitchen_type_id === selectedKitchenType.id)
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

      <section id="project-editor" className="w-full h-full max-h-full overflow-auto p-2">
        {creatingKitchenType && selectedProject && <KitchenTypesCreator project={selectedProject} />}
        {selectedProject && !selectedKitchenType && (
          <>
            <Flex direction="column" gap={4} align="stretch" justify="between" classNames="h-full">
              <Flex direction="column" gap={1} classNames="w-full py-1 px-2 rounded bg-primary">
                <Flex direction="row" gap={1} align="center" justify="between">
                  <Text as="h4" size="small">
                    Editing Project
                  </Text>
                  <Text as="p" size="medium">
                    {selectedProject.name}
                  </Text>
                </Flex>
                <Flex gap={1} direction="column" align="start">
                  <Text as="p" size="medium">
                    Project Name
                  </Text>
                  <input
                    className="bg-static text-text rounded p-1 max-w-[30ch]"
                    type="text"
                    title="Project name"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                </Flex>
              </Flex>
              <Flex gap={4} align="center" justify="center" classNames="w-full">
                {exportableProject && <ReactCSV project={exportableProject} />}
                <Button text="Save Changes" onClick={handleProjectUpdate} loading={loading} icon={SaveRounded} />
              </Flex>
            </Flex>
          </>
        )}
        {selectedProject && selectedKitchenType && !selectedApartment && (
          <KitchenTypesEditor kitchenType={selectedKitchenType} project={selectedProject} />
        )}
        {selectedProject && selectedKitchenType && selectedApartment && (
          <ApartmentEditor project={selectedProject} kitchenType={selectedKitchenType} apartment={selectedApartment} />
        )}
        {/* Placeholder */}
        {!selectedProject && (
          <Flex align="center" justify="center" classNames="h-full">
            <Text as="h2" size="small">
              Select a project to edit
            </Text>
          </Flex>
        )}
      </section>
    </>
  );
};
export default EditProject;
