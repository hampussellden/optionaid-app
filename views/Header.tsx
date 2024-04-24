import React from 'react';
import Text from '@/components/Text';
import '../app/globals.css';
import AuthButton from '../components/AuthButton';

type HeaderProps = {
  rounded?: boolean;
};

export default function Header({ rounded }: HeaderProps) {
  const classes = `${
    rounded ? 'rounded' : ''
  } flex flex-row justify-between w-full bg-static p-4 col-span-2 items-center h-fit
  `;
  return (
    <header className={classes}>
      <a href="/" className="focus:outline-none">
        <Text as="h1" size="small">
          Optionaid
        </Text>
      </a>
      <AuthButton />
    </header>
  );
}
