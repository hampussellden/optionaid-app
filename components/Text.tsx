import React from 'react';

type TextProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  size?: 'small' | 'medium' | 'large';
  italic?: boolean;
  color?: string;
  children?: React.ReactNode;
};

/**
 * Renders a text component with customizable styling options.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.as='p'] - The HTML tag to be used for the text component.
 * @param {string} [props.size='medium'] - The size of the text component.
 * @param {string} props.text - The text content to be rendered.
 * @param {string} props.color - The color of the text component.
 * @returns {JSX.Element} The rendered text component.
 */
const Text = ({ as = 'span', size = 'medium', children, color, italic }: TextProps) => {
  const Tag = as;
  const classes = `
    ${
      Tag === 'h1' &&
      (size === 'large'
        ? 'md:text-6xl text-5xl font-bold'
        : size === 'medium'
        ? 'md:text-5xl text-4xl font-bold'
        : 'md:text-4xl text-3xl font-bold')
    }
    ${
      Tag === 'h2' &&
      (size === 'large'
        ? 'md:text-6xl text-5xl font-semibold'
        : size === 'medium'
        ? 'md:text-5xl text-4xl font-semibold'
        : 'md:text-4xl text-3xl font-semibold')
    }
    ${
      Tag === 'h3' &&
      (size === 'large'
        ? 'md:text-5xl text-4xl font-semibold'
        : size === 'medium'
        ? 'md:text-4xl text-3xl font-semibold'
        : 'md:text-3xl text-2xl font-semibold')
    }
    ${
      Tag === 'h4' &&
      (size === 'large'
        ? 'md:text-3xl text-2xl font-semibold'
        : size === 'medium'
        ? 'md:text-2xl text-xl font-semibold'
        : 'md:text-xl text-lg font-semibold')
    }
    ${
      Tag === 'p' &&
      (size === 'large' ? 'md:text-lg text-base ' : size === 'medium' ? 'md:text-base text-sm ' : ' md:text-sm text-xs')
    }
    ${
      Tag === 'span' &&
      (size === 'large' ? 'md:text-lg text-base' : size === 'medium' ? ' md:text-base  text-sm' : 'md:text-sm text-xs')
    }
    ${italic && 'italic'}
    ${color ? `text-${color}` : 'text-text'}
    `;

  return <Tag className={classes}>{children}</Tag>;
};

export default Text;
