import React from 'react';
import MessagesProvider from './context/MessagesContext';
import FrontsProvider from './context/FrontsContext';
import WorktopsProvider from './context/WorktopsContext';
// import ProjectsContext from './context/ProjectsContext';
import Header from '@/views/Header';
import AdminGrid from '@/Containers/AdminGrid';
import Sidebar from '@/Containers/Sidebar';
import Flex from '@/Containers/Flex';
import AppProvider from './context/AppContext';
import ProjectsProvider from './context/ProjectsContext';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <MessagesProvider>
      <ProjectsProvider>
        <FrontsProvider>
          <WorktopsProvider>
            <AppProvider>
              <AdminGrid>
                <Sidebar />
                <Flex
                  direction="column"
                  justify="start"
                  align="center"
                  classNames="overflow-y-auto h-screen relative"
                >
                  {children}
                </Flex>
              </AdminGrid>
            </AppProvider>
          </WorktopsProvider>
        </FrontsProvider>
      </ProjectsProvider>
    </MessagesProvider>
  );
}
