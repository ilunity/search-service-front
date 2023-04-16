import CytoscapeComponent from 'react-cytoscapejs';
import { ApiGraphStructure } from '../api/search-service.types';

export const cytoscapeStyles: cytoscape.Stylesheet[] = [
  {
    selector: 'node',
    style: {
      'width': 20,
      'height': 20,
      'background-color': '#666',
      'label': 'data(label)',
      'font-size': '10px',
      'color': '#ceb544',
      'font-style': 'italic',
    },
  },
  {
    selector: 'edge',
    style: {
      'width': 3,
      'line-color': '#ccc',
      'target-arrow-color': '#ccc',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
    },
  },
  {
    selector: '.service',
    style: {
      'background-color': '#438454',
      'color': '#ce8944',
    },
  },
  {
    selector: '.dependency',
    style: {
      'background-color': '#936587',
    },
  },
];

export const structureToCytoscapeElements = (structure: ApiGraphStructure) => {
  const nodes = structure.nodes.map(({ id, docIds }) => ({
    data: {
      id,
      docs: docIds,
      label: docIds,
    },
  }));

  const edges = structure.edges.map(({ source, target }) => ({
    data: {
      source,
      target,
    },
  }));

  return CytoscapeComponent.normalizeElements({ nodes, edges });
};

export const structure = {
  'nodes': [
    {
      'id': '3f96717b-9109-4d39-bd60-363736345bd8',
      'docIds': [
        1,
        3,
      ],
    },
    {
      'id': '66778af5-5a51-48a6-a240-2ad2a5c16e6e',
      'docIds': [
        0,
      ],
    },
    {
      'id': '1c93eebf-cc6f-4598-9120-6c596b13d1d8',
      'docIds': [
        2,
      ],
    },
    {
      'id': '267946ed-6d9a-4d1d-966e-7dd7873263fc',
      'docIds': [
        4,
        5,
        6,
      ],
    },
  ],
  'edges': [
    {
      'target': '66778af5-5a51-48a6-a240-2ad2a5c16e6e',
      'source': '3f96717b-9109-4d39-bd60-363736345bd8',
    },
    {
      'target': '1c93eebf-cc6f-4598-9120-6c596b13d1d8',
      'source': '3f96717b-9109-4d39-bd60-363736345bd8',
    },
    {
      'target': '267946ed-6d9a-4d1d-966e-7dd7873263fc',
      'source': '3f96717b-9109-4d39-bd60-363736345bd8',
    },
  ],
};
