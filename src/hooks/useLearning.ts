import {
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    terms,
} from '@/data/terms';

import type {
    Category,
} from '@/data/terms';

export function useLearning() {
  const [category, setCategory] =
    useState<Category>('Programming');

  const [search, setSearch] =
    useState('');

  const [termIndex, setTermIndex] =
    useState(0);

  const filteredTerms = useMemo(() => {
    return terms.filter((term) => {
      const sameCategory =
        term.category === category;

      const matchesSearch =
        term.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        sameCategory &&
        matchesSearch
      );
    });
  }, [category, search]);

  useEffect(() => {
    setTermIndex(0);
  }, [category, search]);

  const currentTerm =
    filteredTerms[termIndex];

  function selectCategory(
    newCategory: Category
  ) {
    setCategory(newCategory);
    setSearch('');
  }

  function nextTerm() {
    if (filteredTerms.length === 0) {
      return;
    }

    setTermIndex((current) =>
      (current + 1) %
      filteredTerms.length
    );
  }

  return {
    category,
    search,
    currentTerm,
    filteredTerms,
    setSearch,
    selectCategory,
    nextTerm,
  };
}