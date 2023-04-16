import React from 'react';
import { CounterCircleProps } from './CounterCircle.types';
import { Box, Typography } from '@mui/material';

export const CounterCircle: React.FC<CounterCircleProps> = ({ count }) => {
  return (
    <Box
      sx={ {
        height: 20,
        width: 20,
        borderRadius: '50%',
        backgroundColor: theme => theme.palette.primary.main,
      } }
    >
      <Typography
        variant={ 'caption' }
        sx={ {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        } }
      >
        { count }
      </Typography>
    </Box>
  );
};
