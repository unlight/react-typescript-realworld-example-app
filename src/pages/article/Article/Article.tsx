import { ArticleServiceInterface, SingleArticle } from '@application/article';
import { inject } from 'njct';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ArticleView } from './ArticleView';

function useData(parameters: { slug: string }) {
  const { slug } = parameters;
  const articleService = inject<ArticleServiceInterface>('articleservice');
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

export function Article(): JSX.Element | null {
  const { slug } = useParams();
  const { article } = useData({ slug: slug! });

  return article ? <ArticleView article={article} /> : null;
}
