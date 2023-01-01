import { ArticleServiceInterface, SingleArticle } from '@application/article';
import { inject } from 'njct';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ArticleView } from './ArticleView';
import { useArticle } from './useArticle';

export function Article(): JSX.Element | null {
  const { slug } = useParams();
  const { article } = useArticle({ slug: slug! });

  return article ? <ArticleView article={article} /> : null;
}
