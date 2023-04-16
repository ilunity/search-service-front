import React from 'react';
import { TitleProps } from './Title.types';
import { Typography } from '@mui/material';

export const Title: React.FC<TitleProps> = ({ children, gutterBottom = true }) => {
  return (
    <Typography
      component='h2'
      variant='h6'
      color='primary'
      gutterBottom={ gutterBottom }
    >
      { children }
    </Typography>
  );
};
