import React, { useContext } from 'react';
import { TermsListProps } from './TermsList.types';
import { IndexesContext } from '../../utils';
import { CurrentIndexContext } from '../../utils/current-index-context';
import { Paper, Stack, Typography } from '@mui/material';
import { TermListChip } from './TermListChip';

export const TermsList: React.FC<TermsListProps> = () => {
  const { indexesState } = useContext(IndexesContext);
  const { currentIndexName } = useContext(CurrentIndexContext);

  return (
    <Paper
      sx={ {
        maxHeight: 430,
        flexShrink: 0,
        p: 2,
        overflowY: 'scroll',
        '&::-webkit-scrollbar': { width: '4px' },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '6px',
          backgroundColor: theme => theme.palette.primary.main,
        },
      } }
    >
      <Stack
        direction={ 'column' }
        spacing={ 1 }
      >
        <Typography variant={ 'body2' }>
          { `Список термов (${ indexesState[currentIndexName].terms.length }):` }
        </Typography>
        {
          indexesState[currentIndexName].terms.map(({ term, docsCount }) => (
            <TermListChip key={ term } term={ term } count={ docsCount } />
          ))
        }
      </Stack>
    </Paper>
  );
};
