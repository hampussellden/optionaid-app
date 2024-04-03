import React from 'react';

type TextProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  size?: 'small' | 'medium' | 'large';
  italic?: boolean;
  color?: string;
  text: string;
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
const Text = ({ as = 'span', size = 'medium', text, color, italic }: TextProps) => {
  const Tag = as;
  const classes = `
    ${
      Tag === 'h1' &&
      (size === 'large'
        ? 'text-8xl lg:text-7xl md:text-6xl sm:text-5xl font-bold'
        : size === 'medium'
        ? 'text-7xl lg:text-6xl md:text-5xl sm:text-4xl font-bold'
        : 'text-6xl lg:text-5xl md:text-4xl sm:text-3xl font-bold')
    }
    ${
      Tag === 'h2' &&
      (size === 'large'
        ? 'text-7xl lg:text-6xl md:text-5xl sm:text-4xl font-semibold'
        : size === 'medium'
        ? 'text-6xl lg:text-5xl md:text-4xl sm:text-3xl font-semibold'
        : 'text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-semibold')
    }
    ${
      Tag === 'h3' &&
      (size === 'large'
        ? 'text-6xl lg:text-5xl md:text-4xl sm:text-3xl font-semibold'
        : size === 'medium'
        ? 'text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-semibold'
        : 'text-4xl lg:text-3xl md:text-2xl sm:text-xl font-semibold')
    }
    ${
      Tag === 'h4' &&
      (size === 'large'
        ? 'text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-semibold'
        : size === 'medium'
        ? 'text-4xl lg:text-3xl md:text-2xl sm:text-xl font-semibold'
        : 'text-3xl lg:text-2xl md:text-xl sm:text-lg font-semibold')
    }
    ${
      Tag === 'p' &&
      (size === 'large'
        ? 'text-xl lg:text-lg md:text-base sm:text-sm'
        : size === 'medium'
        ? 'text-lg lg:text-base md:text-sm sm:text-xs'
        : 'text-base lg:text-sm md:text-xs sm:text-xs')
    }
    ${
      Tag === 'span' &&
      (size === 'large'
        ? 'text-xl lg:text-lg md:text-base sm:text-sm'
        : size === 'medium'
        ? 'text-lg lg:text-base md:text-sm sm:text-xs'
        : 'text-base lg:text-sm md:text-xs sm:text-xxs')
    }
    ${italic && 'italic'}
    ${color ? `text-${color}` : 'text-text'}
    `;

  return <Tag className={classes}>{text}</Tag>;
};

export default Text;
