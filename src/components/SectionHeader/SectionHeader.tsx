import React from 'react';
import { SectionHeaderProps } from './SectionHeader.types';
import { Stack } from '@mui/material';
import { Title } from '../Title';

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, children }) => {
  return (
    <Stack
      alignItems={ 'center' }
      spacing={ 2 }
      direction={ 'row' }
      sx={ { mb: 2 } }
    >
      <Title gutterBottom={ false }>
        { title }
      </Title>
      { children }
    </Stack>
  );
};
