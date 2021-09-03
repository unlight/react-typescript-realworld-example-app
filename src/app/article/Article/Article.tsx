import { Interface } from '@libs/application';
import { Article as SingleArticle } from '@libs/application/article';
import { inject } from 'njct';
import React, { useCallback, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { ArticleView } from './ArticleView';

function useData(parameters: { slug: string }) {
  const { slug } = parameters;
  const articleService = inject<Interface.ArticleService>('articleservice');
  const [article, setArticle] = useState<SingleArticle | undefined>(undefined);

  const getArticle = useCallback(
    async slug => {
      const article = await articleService.findOne(slug);
      setArticle(article);
    },
    [articleService],
  );

  useEffect(() => {
    void getArticle(slug);
  }, [slug, getArticle]);

  return { article };
}

export function Article({ match }: RouteComponentProps<{ slug: string }>): JSX.Element {
  const { article } = useData({ slug: match.params.slug });

  return <ArticleView article={article} />;
}
