import { Article } from '@libs/application/article';
import classNames from 'clsx';
import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';

import { useTogglefavoriteArticle } from './use-toggle-favorite-article.hook';

type ArticlePreviewProps = {
  article: Article;
};

export function ArticlePreview(props: ArticlePreviewProps): JSX.Element {
  const { author, description, title, slug, createdAt } = props.article;
  const { toggleCallback, articleReader } = useTogglefavoriteArticle(
    slug,
    props.article.favorited,
  );

  // const favoritesCount =
  //   articleReader(article => article.favoritesCount) ?? props.article.favoritesCount;
  // const favorited =
  //   articleReader(article => article.favorited) ?? props.article.favorited;

  // console.log('favorited', favorited);

  const favoriteButtonClass = classNames(
    'btn btn-sm pull-xs-right',
    props.article.favorited ? 'btn-primary' : 'btn-outline-primary',
  );

  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href="profile.html">
          <img src={author.image} />
        </a>
        <div className="info">
          <Link to={`/profile/${author.username}`} className="author">
            {author.username}
          </Link>
          <span className="date">{createdAt}</span>
        </div>
        <Suspense
          fallback={<ButtonSuspensed favoritesCount={props.article.favoritesCount} />}
        >
          <Button
            articleReader={articleReader}
            favoritesCount={props.article.favoritesCount}
            toggleCallback={toggleCallback}
            favoriteButtonClass={favoriteButtonClass}
          />
        </Suspense>
      </div>
      <a href={`/article/${slug}`} className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
      </a>
    </div>
  );
}

function Button({
  favoriteButtonClass,
  toggleCallback,
  articleReader,
  favoritesCount,
}: any) {
  const article = articleReader();
  return (
    <button className={favoriteButtonClass} onClick={toggleCallback}>
      <i className="ion-heart"></i> {article?.favoritesCount ?? favoritesCount}
    </button>
  );
}

function ButtonSuspensed({ favoritesCount }: any) {
  return (
    <button className="btn btn-sm pull-xs-right" disabled>
      <i className="ion-heart"></i> {favoritesCount}
    </button>
  );
}
