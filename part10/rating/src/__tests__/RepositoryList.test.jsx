import { render, screen, within } from '@testing-library/react-native';

import { RepositoryListContainer } from '../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);

      // screen.debug();

      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      const firstScreen = within(firstRepositoryItem);
      expect(firstScreen.getByText('jaredpalmer/formik')).toBeOnTheScreen();
      expect(firstScreen.getByText('Build forms in React, without the tears')).toBeOnTheScreen();
      expect(firstScreen.getByText('TypeScript')).toBeOnTheScreen();
      expect(firstScreen.getByText('1.6k')).toBeOnTheScreen();
      expect(firstScreen.getByText('21.9k')).toBeOnTheScreen();
      expect(firstScreen.getByText('88')).toBeOnTheScreen();
      expect(firstScreen.getByText('3')).toBeOnTheScreen();

      const secondScreen = within(secondRepositoryItem);
      expect(secondScreen.getByText('async-library/react-async')).toBeOnTheScreen();
      expect(secondScreen.getByText('Flexible promise-based React data loader')).toBeOnTheScreen();
      expect(secondScreen.getByText('JavaScript')).toBeOnTheScreen();
      expect(secondScreen.getByText('69')).toBeOnTheScreen();
      expect(secondScreen.getByText('1.8k')).toBeOnTheScreen();
      expect(secondScreen.getByText('72')).toBeOnTheScreen();
      expect(secondScreen.getByText('3')).toBeOnTheScreen();
    });
  });
});
