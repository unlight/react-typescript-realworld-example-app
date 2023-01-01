import { render, waitFor } from '@testing-library/react';
import { injector } from 'njct';
import React from 'react';
import { Ok } from 'rsts';
import { afterAll, beforeEach, expect, it, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';

import { App } from './App';
import { ArticleServiceInterface } from './article';
import { SessionServiceInterface } from './auth';
import * as Tokens from './tokens';

vi.mock('./home/PopularTags', () => ({ PopularTags: () => 'populartags' }));

let articleService = mock<ArticleServiceInterface>();
let sessionService = mock<SessionServiceInterface>();

beforeEach(() => {
  articleService = mock<ArticleServiceInterface>();
  sessionService = mock<SessionServiceInterface>();
  injector.provide(Tokens.ArticleService, () => articleService);
  injector.provide(Tokens.SessionService, () => sessionService);

  articleService.findMany.mockResolvedValue(
    Ok({ articles: [], articlesCount: 0 }),
  );
});

afterAll(() => {
  injector.clear();
});

it('renders app component', async () => {
  const screen = render(<App />);
  await waitFor(() => {
    expect(screen.getByText('Home')).toBeTruthy();
  });
});

it('renders all app html', async () => {
  const screen = render(<App />);
  await waitFor(() => {
    expect(screen.baseElement.outerHTML).toBeTruthy();
  });
});
