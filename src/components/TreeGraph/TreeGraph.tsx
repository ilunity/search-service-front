import React, { forwardRef, useEffect, useState } from 'react';
import { TreeGraphProps } from './TreeGraph.types';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { cytoscapeStyles, structureToCytoscapeElements } from '../../utils';
import { Box } from '@mui/material';
import { Title } from '../Title';
import { InvertedIndexEnum } from '../../utils/consts';

cytoscape.use(dagre);

export const TreeGraph = forwardRef<HTMLDivElement, TreeGraphProps>(({ structure, term }, ref) => {
  const [cy, setCy] = useState<cytoscape.Core | undefined>(undefined);

  useEffect(() => {
    if (cy) {
      cy.addListener('tap', 'node', function(event) {
        const target = event.target;

      });
    }

  }, [cy]);

  return (
    <>
      <Box
        sx={ {
          p: 2,
          borderBottom: '1px solid grey',
        } }
      >
        <Title gutterBottom={ false }>
          { `Структура постинг листа для терма "${ term }"` }
        </Title>
      </Box>
      <Box
        sx={ {
          height: 500,
        } }
        ref={ ref }
      >
        <CytoscapeComponent
          elements={ structureToCytoscapeElements(structure.structure) }
          style={ { width: '100%', height: '100%' } }
          layout={ {
            name: structure.type === InvertedIndexEnum.BTREE_INDEX ? 'dagre' : 'grid',
          } }
          stylesheet={ cytoscapeStyles }
          cy={ cy => setCy(cy) }
        />
      </Box>
    </>
  );
});
