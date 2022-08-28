import { SingleArticle } from '@application/article';
import { Pagination } from '@components';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { ArticlePreview } from '../article/Article';
import { PopularTags } from './PopularTags';

type HomeViewProps = {
  articles: SingleArticle[];
};

export function HomeView(props: HomeViewProps): JSX.Element {
  const { articles } = props;

  return (
    <div className="home-page">
      {/*<div className="banner">
                <div className="container">
                    <h1 className="logo-font">conduit</h1>
                    <p>A place to share your knowledge.</p>
                </div>
            </div>*/}
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink to="/feed" className="nav-link">
                    Your Feed
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">
                    Global Feed
                  </NavLink>
                </li>
              </ul>
            </div>
            {articles.map(article => (
              <ArticlePreview key={article.slug} article={article} />
            ))}
            <Pagination />
          </div>

          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
}
