import { Interface } from '@libs/application';
import { render, waitFor } from '@testing-library/react';
import { mock } from 'jest-mock-extended';
import { injector } from 'njct';
import React from 'react';

import { App } from './App';

jest.mock('./home/PopularTags', () => ({ PopularTags: () => 'populartags' }));

let articleService = mock<Interface.ArticleService>();
let sessionService = mock<Interface.SessionService>();

beforeEach(() => {
  articleService = mock<Interface.ArticleService>();
  sessionService = mock<Interface.SessionService>();
  injector.provide('articleservice', () => articleService);
  injector.provide('sessionservice', () => sessionService);

  articleService.findMany.mockResolvedValue({ articles: [], articlesCount: 0 });
});

afterAll(() => {
  injector.clear();
});

it('renders app component', async () => {
  const screen = render(<App />);
  await waitFor(() => {
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});

it('renders all app html', async () => {
  const screen = render(<App />);
  await waitFor(() => {
    expect(screen.baseElement.outerHTML).toBeTruthy();
  });
});
