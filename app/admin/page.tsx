'use client';
import React, { useContext } from 'react';
import Message from '../../components/Message';
import { MessagesContext, MessagesContextType } from './context/MessagesContext';
import { AppContext, AppContextType } from './context/AppContext';
import EditProject from '@/views/EditProject';
import { AppState } from './context/AppContext';
import ProjectCreator from '@/components/ProjectCreator';
import EditFronts from '@/views/EditFronts';
import FrontTypesCreator from '@/components/FrontTypesCreator';
import EditWorktops from '@/views/EditWorktops';
import WorktopTypesCreator from '@/components/WorktopTypesCreator';

const Admin = () => {
  const { messages } = useContext(MessagesContext) as MessagesContextType;
  const { state } = useContext(AppContext) as AppContextType;
  const getComponentFromState = (state: AppState) => {
    switch (state) {
      case 'EditProject':
        return <EditProject />;
      case 'CreateProject':
        return <ProjectCreator />;
      case 'EditFrontType':
        return <EditFronts />;
      case 'CreateFrontType':
        return <FrontTypesCreator />;
      // case 'EditFront':
      //   return <EditFront id={id} />;
      // case 'CreateFront':
      //   return <CreateFront id={id} />;
      case 'EditWorktopType':
        return <EditWorktops />;
      case 'CreateWorktopType':
        return <WorktopTypesCreator />;
      // case 'EditWorktop':
      //   return <EditWorktop id={id} />;
      // case 'CreateWorktop':
      //   return <CreateWorktop id={id} />;
      default:
        return <p>nothing to see here yet</p>;
    }
  };
  return (
    <>
      {state && getComponentFromState(state)}
      {messages.length > 0 && (
        <section className="flex flex-col-reverse justify-start gap-2 self-start fixed bottom-2 right-2 items-end transition ">
          {messages.map((message, i) => (
            <Message message={message} key={i} />
          ))}
        </section>
      )}
    </>
  );
};

export default Admin;
