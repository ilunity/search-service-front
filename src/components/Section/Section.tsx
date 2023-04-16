import React from 'react';
import { SectionProps } from './Section.types';
import { Paper } from '@mui/material';

export const Section: React.FC<SectionProps> = ({ children }) => {
  return (
    <Paper
      sx={ {
        width: 800,
        p: 3,
      } }
    >
      { children }
    </Paper>
  );
};
