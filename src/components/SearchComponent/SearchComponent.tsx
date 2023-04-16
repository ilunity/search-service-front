import React from 'react';
import { SearchComponentProps } from './SearchComponent.types';
import { SearchForm } from './SearchForm';
import { SearchResults } from './SearchResults';
import { Section } from '../Section';
import { SectionHeader } from '../SectionHeader';

export const SearchComponent: React.FC<SearchComponentProps> = () => {
  return (
    <Section>
      <SectionHeader title={ 'Поиск' } />
      <SearchForm />
      <SearchResults />
    </Section>
  );
};
