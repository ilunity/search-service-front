import React, { useContext } from 'react';
import { IndexManagerHeaderProps } from './IndexManagerHeader.types';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { CurrentIndexContext, IndexesContext } from '../../../utils';
import { SIDE_BAR_WIDTH } from '../../../utils/consts';
import { grey } from '@mui/material/colors';

export const IndexManagerHeader: React.FC<IndexManagerHeaderProps> = () => {
  const { currentIndexName } = useContext(CurrentIndexContext);
  const { indexesState } = useContext(IndexesContext);

  return (
    <AppBar
      position={ 'fixed' }
      sx={ {
        width: `calc(100% - ${ SIDE_BAR_WIDTH }px)`,
        ml: `${ SIDE_BAR_WIDTH }px`,
        backgroundColor: grey['300'],
      } }
    >
      <Toolbar
        sx={ {
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        } }
      >
        <Typography
          variant='h6'
          component='h2'
          color={ theme => theme.palette.text.primary }
        >
          { currentIndexName?.toUpperCase() || 'Выберите индекс' }
        </Typography>
        { currentIndexName &&
          <>
            <Typography
              color={ theme => theme.palette.primary.main }
            >
              { `(${ indexesState[currentIndexName].type })` }
            </Typography>
            <Typography
              color={ theme => theme.palette.primary.main }
              sx={ { flex: '1 0 auto' } }
            >
              Проиндексированных документов: { indexesState[currentIndexName].docsCount }
            </Typography>
          </>
        }
      </Toolbar>
    </AppBar>
  );
};
