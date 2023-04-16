import React, { useContext } from 'react';
import { SidebarProps } from './Sidebar.types';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Title } from '../Title';
import { CreateIndexForm } from '../CreateIndexForm';
import { IndexesContext } from '../../utils';
import { CurrentIndexContext } from '../../utils/current-index-context';
import CheckIcon from '@mui/icons-material/Check';
import { InvertedIndexEnum, SIDE_BAR_WIDTH } from '../../utils/consts';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LinkIcon from '@mui/icons-material/Link';

export const Sidebar: React.FC<SidebarProps> = () => {
  const { indexesState } = useContext(IndexesContext);
  const { currentIndexName, setCurrentIndexName } = useContext(CurrentIndexContext);

  return (
    <Drawer
      sx={{
        width: SIDE_BAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SIDE_BAR_WIDTH,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List
        sx={ {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        } }
      >
        <ListItem
          sx={ {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          } }
        >
          <Title gutterBottom={ true }>
            Индексы:
          </Title>
        </ListItem>
        <Divider />
        {
          Object.entries(indexesState).map(([indexName, indexData]) => (
            <ListItem
              key={ indexName }
              disablePadding
              selected={ indexName === currentIndexName }
            >
              <ListItemButton
                onClick={ () => setCurrentIndexName(indexName) }
              >
                <ListItemIcon>
                  { indexData.type === InvertedIndexEnum.BTREE_INDEX
                    ? <AccountTreeIcon />
                    : indexData.type === InvertedIndexEnum.LINKED_LIST_INDEX
                      ? <LinkIcon />
                      : <></>
                  }
                </ListItemIcon>
                <ListItemText primary={ indexName.toUpperCase() } />
                { indexName === currentIndexName && <CheckIcon color={ 'primary' } /> }
              </ListItemButton>
            </ListItem>
          ))
        }
        <Divider
          sx={ {
            mt: 'auto',
            mb: 1,
          } } />
        <ListItem>
          <CreateIndexForm />
        </ListItem>
      </List>
    </Drawer>
  );
};
