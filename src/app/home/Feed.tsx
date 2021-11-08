import { ArticleFeedHandler } from '@libs/application/article/queries';
import React from 'react';
import usePromise from 'react-use-promise';

import { HomeView } from './HomeView';

function useData() {
  const [articleList] = usePromise(() => {
    return new ArticleFeedHandler().execute();
  }, []);

  return { articleList };
}

export function Feed(): JSX.Element {
  const { articleList } = useData();

  return <HomeView articles={articleList?.articles} />;
}
