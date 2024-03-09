import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { CreationMessage } from '../app/types';

type MessageProps = {
  message: CreationMessage;
};

const Message = (props: MessageProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // The element lose opacity after 5 seconds
    const timer2 = setTimeout(() => {
      setHidden(true);
    }, 5500); // The element will disappear after 5.5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={classNames(
        {
          'border-accent': props.message.type == 'error',
          'border-secondary': props.message.type == 'success',
          'translate-x-[105%]': !isVisible,
          ' hidden ': hidden,
        },
        'font-semibold p-4 bg-background rounded h-fit w-fit mt-auto border transition duration-500 ease',
      )}
    >
      <p className="text-text">{props.message.message}</p>
    </div>
  );
};

export default Message;
