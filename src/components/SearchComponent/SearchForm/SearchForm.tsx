import React, { useContext } from 'react';
import { SearchFormProps, SearchInputs } from './SearchForm.types';
import { Fab, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import { SearchAlgorithmEnum } from '../../../utils/consts';
import SearchIcon from '@mui/icons-material/Search';
import { useController, useForm } from 'react-hook-form';
import { CurrentIndexContext } from '../../../utils/current-index-context';
import { executeRequest } from '../../../api/execute-request';
import { searchService } from '../../../api';
import { IndexesContext } from '../../../utils';

export const SearchForm: React.FC<SearchFormProps> = () => {
  const { currentIndexName } = useContext(CurrentIndexContext);
  const { indexesState, indexesDispatch } = useContext(IndexesContext);

  const lastResults = indexesState[currentIndexName]?.lastSearch;

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
  } = useForm<SearchInputs>({
    defaultValues: {
      algorithmType: lastResults ? lastResults.algorithmType : SearchAlgorithmEnum.BM25_SCORE,
      query: lastResults ? lastResults.query : '',
    },
  });

  const {
    field: { onChange },
  } = useController({
    name: 'algorithmType',
    control,
    rules: { required: true },
  });

  const algorithmType = watch('algorithmType');

  const onSubmit = async (data: SearchInputs) => {
    const { algorithmType, query } = data;

    const {
      success,
      data: results,
    } = await executeRequest(() => searchService.search(currentIndexName, algorithmType, query));
    if (!success) {
      return;
    }

    indexesDispatch({
      type: 'addLastSearch',
      indexName: currentIndexName,
      payload: {
        algorithmType,
        query,
        results,
      },
    });
  };

  return (
    <>
      <Stack
        component={ 'form' }
        spacing={ 2 }
        direction={ 'row' }
        mb={ 4 }
        onSubmit={ handleSubmit((data) => onSubmit(data)) }
      >
        <FormControl sx={ { width: 180 } }>
          <InputLabel id='search-algorithm-type'>Ранжирование</InputLabel>
          <Select
            labelId='search-algorithm-type'
            value={ algorithmType }
            label='Ранжирование'
            onChange={ (event: SelectChangeEvent) => {
              onChange(event.target.value);
            } }
          >
            <MenuItem value={ SearchAlgorithmEnum.BM25_SCORE }>
              BM-25
            </MenuItem>
            <MenuItem value={ SearchAlgorithmEnum.FREQUENCY_SCORE }>
              Frequency score
            </MenuItem>
            <MenuItem value={ SearchAlgorithmEnum.DISTANCE_SCORE }>
              Distance score
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          { ...register('query', { required: true }) }
          label={ 'Запрос' }
          sx={ { width: 400 } }
        />
        <Fab
          color={ 'primary' }
          type={ 'submit' }
        >
          <SearchIcon />
        </Fab>
      </Stack>
    </>
  );
};
