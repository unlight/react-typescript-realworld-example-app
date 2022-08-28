import { Tokens } from '@application';
import { ArticleServiceInterface } from '@application/article';
import { useRequest } from 'ahooks';
import { inject } from 'njct';
import React from 'react';

import { HomeView } from './HomeView';

function useHome() {
  const { data: articleList } = useRequest(async () => {
    const articleService = inject<ArticleServiceInterface>(Tokens.ArticleService);
    const result = await articleService.findMany();
    return result.unwrap();
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
