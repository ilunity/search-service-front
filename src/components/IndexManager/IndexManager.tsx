import React, { useContext } from 'react';
import { IndexProps } from './IndexManager.types';
import { Container, Stack } from '@mui/material';
import { AddDocForm } from '../AddDocForm';
import { CurrentIndexContext } from '../../utils';
import { SearchComponent } from '../SearchComponent';
import { IndexManagerHeader } from './IndexManagerHeader';
import { TermsList } from '../TermsList';

export const IndexManager: React.FC<IndexProps> = () => {
  const { currentIndexName } = useContext(CurrentIndexContext);

  return (
    <>
      <IndexManagerHeader />
      <Container
        component={ 'main' }
        sx={ {
          display: 'flex',
          flexDirection: 'row',
          gap: 6,
          mt: 8,
          p: 3,
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          overflow: 'auto',
        } }
      >
        {
          currentIndexName &&
          <>
            <Stack
              alignItems={ 'center' }
              spacing={ 6 }
            >
              <AddDocForm />
              <SearchComponent />
            </Stack>
            <TermsList />
          </>
        }
      </Container>
    </>
  );
};
