import { ArticleListHandler } from '@libs/application/article/queries';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import usePromise from 'react-use-promise';

import { HomeView } from './HomeView';

function useData() {
  const [articleList] = usePromise(() => {
    return new ArticleListHandler().execute();
  }, []);

  return { articleList };
}

export function Home(props: RouteComponentProps): JSX.Element {
  const { articleList } = useData();

  return <HomeView articles={articleList?.articles} />;
}
