import React, { useContext } from 'react';
import { CreateIndexInputs } from './CreateIndexForm.types';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useController, useForm } from 'react-hook-form';
import { InvertedIndexEnum } from '../../utils/consts';
import { IndexesContext } from '../../utils';
import { searchService } from '../../api';
import { executeRequest } from '../../api/execute-request';

export const CreateIndexForm: React.FC = () => {
  const { indexesDispatch, updateIndexes } = useContext(IndexesContext);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
  } = useForm<CreateIndexInputs>({ defaultValues: { type: InvertedIndexEnum.BTREE_INDEX } });

  const {
    field: { onChange },
  } = useController({
    name: 'type',
    control,
    rules: { required: true },
  });

  const currentType = watch('type');

  const onSubmit = async (data: CreateIndexInputs) => {
    const { name, type } = data;

    const { success } = await executeRequest(() => searchService.createIndex(name, type));
    if (!success) {
      return;
    }

    updateIndexes();
    reset();
  };

  return (
    <Stack
      component={ 'form' }
      gap={ 2 }
      onSubmit={ handleSubmit((data) => onSubmit(data)) }
    >
      <Stack
        direction={ 'row' }
        alignItems={ 'center' }
        gap={ 2 }
      >
        <TextField
          label={ 'Название' }
          { ...register('name', { required: true }) }
        />
        <FormControl sx={ { width: 150 } }>
          <InputLabel id='index-type'>Вид индекса</InputLabel>
          <Select
            labelId='index-type'
            value={ currentType }
            label='Ранжирование'
            onChange={ (event: SelectChangeEvent) => {
              onChange(event.target.value);
            } }
          >
            <MenuItem value={ InvertedIndexEnum.BTREE_INDEX }>
              B-Tree
            </MenuItem>
            <MenuItem value={ InvertedIndexEnum.LINKED_LIST_INDEX }>
              Linked List
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Button type={ 'submit' } variant={ 'contained' }>
        <Typography>
          Создать
        </Typography>
      </Button>
    </Stack>
  );
};
