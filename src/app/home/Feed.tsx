import { ArticleFeedHandler } from '@application/article';
import { useRequest } from 'ahooks';
import React from 'react';

import { HomeView } from './HomeView';

function useFeed() {
  const { data: articleList } = useRequest(async () => {
    const command = new ArticleFeedHandler();
    return await command.execute();
  });

  return { articleList };
}

export function Feed(): JSX.Element | null {
  const { articleList } = useFeed();

  if (!articleList) {
    return null;
  }

  return <HomeView articles={articleList.articles} />;
}
