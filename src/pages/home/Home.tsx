import { ArticleListHandler } from '@application/article/queries';
import { useRequest } from 'ahooks';
import React from 'react';

import { HomeView } from './HomeView';

function useHome() {
  const { data: articleList } = useRequest(async () => {
    const command = new ArticleListHandler();
    return await command.execute();
  });

  return { articleList };
}

export function Home(): JSX.Element | null {
  const { articleList } = useHome();

  if (!articleList) {
    return null;
  }

  return <HomeView articles={articleList.articles} />;
}
