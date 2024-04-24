import React from 'react';
import MessagesProvider from './context/MessagesContext';
import FrontsProvider from './context/FrontsContext';
import WorktopsProvider from './context/WorktopsContext';
import ProjectsContext from './context/ProjectsContext';
import Header from '@/views/Header';
import AdminGrid from '@/containers/AdminGrid';
import Sidebar from '@/containers/Sidebar';
import AppProvider from './context/AppContext';
import Flex from '@/containers/Flex';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <MessagesProvider>
      <ProjectsContext>
        <FrontsProvider>
          <WorktopsProvider>
            <AppProvider>
              <AdminGrid>
                <Header />
                <Sidebar />
                <Flex>{children}</Flex>
              </AdminGrid>
            </AppProvider>
          </WorktopsProvider>
        </FrontsProvider>
      </ProjectsContext>
    </MessagesProvider>
  );
}
