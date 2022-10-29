import React from 'react';

import { HomeView } from './HomeView';
import { useHome } from './useHome';

export function Home(): JSX.Element | null {
  const { articleList } = useHome();

  if (!articleList) {
    return null;
  }

  return (
    <HomeView
      articles={articleList.articles}
      count={articleList.articlesCount}
    />
  );
}
