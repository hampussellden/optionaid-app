'use client';
import React, { useContext } from 'react';
import Message from '../../components/Message';
import { MessagesContext, MessagesContextType } from './context/MessagesContext';
import { AppContext, AppContextType } from './context/AppContext';
import EditProject from '@/views/EditProject';

const Admin = () => {
  const { messages } = useContext(MessagesContext) as MessagesContextType;
  const { state, id } = useContext(AppContext) as AppContextType;
  return (
    <>
      {state === 'EditProject' && <EditProject id={id} />}
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
