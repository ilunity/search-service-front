import React, { useContext, useState } from 'react';
import { TermListChipProps } from './TermListChip.types';
import { Box, Chip, Modal } from '@mui/material';
import { CounterCircle } from '../../CounterCircle';
import { TreeGraph } from '../../TreeGraph';
import { searchService } from '../../../api';
import { CurrentIndexContext } from '../../../utils';
import { executeRequest } from '../../../api/execute-request';
import { ApiListStructure } from '../../../api/search-service.types';

export const TermListChip: React.FC<TermListChipProps> = ({ term, count }) => {
  const { currentIndexName } = useContext(CurrentIndexContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [structure, setStructure] = useState<ApiListStructure>({} as ApiListStructure);

  const handleTermOpen = async () => {
    const { success, data } = await executeRequest(() => searchService.getStructure(currentIndexName, term));
    if (!success) {
      return;
    }

    setStructure(data);
    setIsOpen(true);
  };

  return (
    <>
      <Chip
        sx={ {
          width: 130,
          '& .MuiBox-root': {
            ml: 'auto',
            mr: '5px',
          },
        } }
        clickable
        label={ term }
        onClick={ handleTermOpen }
        onDelete={ () => {
        } }
        deleteIcon={ <CounterCircle count={ count } /> }
      />
      <Modal
        open={ isOpen }
        onClose={ () => setIsOpen(false) }
      >
        <Box sx={ {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1000,
          height: 600,
          bgcolor: 'background.paper',
          borderRadius: '10px',
        } }>
          <TreeGraph
            term={ term }
            structure={ structure }
          />
        </Box>
      </Modal>
    </>
  );
};
