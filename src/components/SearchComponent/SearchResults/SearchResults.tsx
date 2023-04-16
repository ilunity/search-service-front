import React, { useContext } from 'react';
import { SearchResultsProps } from './SearchResults.types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { IndexesContext } from '../../../utils';
import { CurrentIndexContext } from '../../../utils/current-index-context';

export const SearchResults: React.FC<SearchResultsProps> = () => {
  const { indexesState } = useContext(IndexesContext);
  const { currentIndexName } = useContext(CurrentIndexContext);

  const lastSearch = indexesState[currentIndexName].lastSearch;
  const isSearchExists = lastSearch !== null;
  const isResultsNotEmpty = lastSearch?.results.length !== 0;

  if (!isSearchExists) {
    return <></>;
  }

  return (
    <>
      <Typography
        variant={ 'body1' }
        color='primary'
        gutterBottom
      >
        { isResultsNotEmpty
          ? 'Рузультаты:'
          : 'Совпадения не найдены'
        }
      </Typography>
      {
        isResultsNotEmpty &&
        <TableContainer component={ 'div' }>
          <Table
            size='small'
            sx={ {
              width: 400,
            } }
          >
            <TableHead sx={ { '& th': { fontWeight: 'bold' } } }>
              <TableRow>
                <TableCell>Doc Id</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { lastSearch.results.map((row) => (
                <TableRow key={ row.docId }>
                  <TableCell>{ row.docId }</TableCell>
                  <TableCell>{ row.score }</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>
      }
    </>
  );
};
