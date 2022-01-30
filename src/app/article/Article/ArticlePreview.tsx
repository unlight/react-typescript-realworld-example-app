import { SingleArticle } from '@libs/application/article';
import React from 'react';
import { Link } from 'react-router-dom';

import { ArticleMeta } from './ArticleMeta';

type ArticlePreviewProps = {
  article: SingleArticle;
};

export function ArticlePreview(props: ArticlePreviewProps): JSX.Element {
  const { article } = props;
  const { author, description, title, slug, createdAt } = article;

  return (
    <div className="article-preview">
      <ArticleMeta author={author} createdAt={createdAt} article={article} />
      <Link to={`/article/${slug}`} className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
}
