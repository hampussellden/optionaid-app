'use client';
import React, { useContext } from 'react';
import Message from '../../components/Message';
import { MessagesContext, MessagesContextType } from './context/MessagesContext';
import AdminProjectsView from '../../views/AdminProjectsView';
import AdminFrontsView from '../../views/AdminFrontsView';
import AdminWorktopsView from '../../views/AdminWorktopsView';

const Admin = () => {
  const { messages } = useContext(MessagesContext) as MessagesContextType;

  return (
    <>
      <AdminProjectsView />
      <AdminFrontsView />
      <AdminWorktopsView />
      {messages.length > 0 && (
        <section className="flex flex-col-reverse justify-start gap-2 self-start fixed bottom-2 right-2 items-end transition">
          {messages.map((message, i) => (
            <Message message={message} key={i} />
          ))}
        </section>
      )}
    </>
  );
};

export default Admin;
