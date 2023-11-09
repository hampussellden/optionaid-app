import React, { useState } from 'react';
import classNames from 'classnames';
import { CreationMessage } from '../types';

type MessageProps = {
  message: CreationMessage;
};

const Message = (props: MessageProps) => {
  return (
    <p
      className={classNames(
        { 'text-accent': props.message.type == 'error', 'text-text': props.message.type == 'success' },
        'text-sm font-semibold p-2 bg-background rounded h-fit mt-auto',
      )}
    >
      {props.message.message}
    </p>
  );
};

export default Message;
