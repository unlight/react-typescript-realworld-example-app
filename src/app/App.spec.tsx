import { Interface } from '@libs/application';
import { render, waitFor } from '@testing-library/react';
import { mock } from 'jest-mock-extended';
import { injector } from 'njct';
import React from 'react';

import { App } from './App';

jest.mock('./home/PopularTags', () => ({ PopularTags: () => 'populartags' }));

it('renders app component', async () => {
    const articleService = mock<Interface.ArticleService>();
    articleService.findMany.mockResolvedValue({ articles: [], articlesCount: 0 });
    injector.provide('articleservice', () => articleService);
    const screen = render(<App />);
    await waitFor(() => {
        expect(screen.getByText('Home')).toBeInTheDocument();
    });
});

it('renders all app html', async () => {
    const articleService = mock<Interface.ArticleService>();
    articleService.findMany.mockResolvedValue({ articles: [], articlesCount: 0 });
    injector.provide('articleservice', () => articleService);
    const screen = render(<App />);
    await waitFor(() => {
        expect(screen.baseElement.outerHTML).toBeTruthy();
    });
});
