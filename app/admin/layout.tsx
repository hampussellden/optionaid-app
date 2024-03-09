import React from 'react';
import MessagesProvider from './context/MessagesContext';
import FrontsProvider from './context/FrontsContext';
import WorktopsProvider from './context/WorktopsContext';
import ProjectsContext from './context/ProjectsContext';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <MessagesProvider>
      <ProjectsContext>
        <FrontsProvider>
          <WorktopsProvider>{children}</WorktopsProvider>
        </FrontsProvider>
      </ProjectsContext>
    </MessagesProvider>
  );
}
