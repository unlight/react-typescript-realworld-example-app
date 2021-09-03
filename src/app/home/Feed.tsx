import { ArticleFeedHandler } from '@libs/application/article/queries';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import usePromise from 'react-use-promise';

import { HomeView } from './HomeView';

function useData() {
  const [articleList] = usePromise(() => {
    return new ArticleFeedHandler().execute();
  }, []);

  return { articleList };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Feed(_: RouteComponentProps): JSX.Element {
  const { articleList } = useData();

  return <HomeView articles={articleList?.articles} />;
}
