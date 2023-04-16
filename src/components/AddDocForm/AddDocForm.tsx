import React, { useContext, useState } from 'react';
import { AddDocFormProps, AddDocInputs } from './AddDocForm.types';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Section } from '../Section';
import { SectionHeader } from '../SectionHeader';
import { IndexesContext } from '../../utils';
import { useForm } from 'react-hook-form';
import { searchService } from '../../api';
import { CurrentIndexContext } from '../../utils/current-index-context';
import { executeRequest } from '../../api/execute-request';

export const AddDocForm: React.FC<AddDocFormProps> = () => {
  const { updateIndexes } = useContext(IndexesContext);
  const { currentIndexName } = useContext(CurrentIndexContext);
  const [lastDocId, setLastDocId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<AddDocInputs>();

  const onSubmit = async (data: AddDocInputs) => {
    const { content } = data;

    const { success, data: docId } = await executeRequest(() => searchService.addDoc(currentIndexName, content));

    if (!success) {
      return;
    }

    updateIndexes();
    setLastDocId(docId);
    reset();
  };

  return (
    <Section>
      <Box
        component={ 'form' }
        onSubmit={ handleSubmit((data) => onSubmit(data)) }
      >
        <SectionHeader title={ 'Добавить документ' } />
        <Stack
          spacing={ 2 }
          sx={ {
            alignItems: 'flex-start',
          } }
        >
          <TextField
            { ...register('content', { required: true }) }
            label={ 'Текст' }
            sx={ { width: 500 } }
            multiline
            maxRows={ 6 }
          />
          <Stack
            direction={ 'row' }
            alignItems={ 'center' }
            spacing={ 2 }
          >
            <Button
              variant={ 'outlined' }
              type={ 'submit' }
              onClick={ handleSubmit((data) => onSubmit(data)) }
            >
              Добавить
            </Button>
            <Typography>
              { lastDocId !== null && `Присвоенный идентификатор: ${ lastDocId }` }
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Section>
  );
};
