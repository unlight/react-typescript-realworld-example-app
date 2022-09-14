import React from 'react';

import { ArticlePreview } from '../article/Article';
import { useProfile } from './useProfile';
import { UserInfo } from './UserInfo';

export function Profile() {
  const { profile, articleList, serverError, toggleFollow, toggleFollowInProgress } =
    useProfile();

  return (
    <div className="profile-page">
      {serverError && <p className="error-messages my-4">{serverError}</p>}
      {profile && (
        <UserInfo
          profile={profile}
          toggleFollow={toggleFollow}
          disableToggleFollow={toggleFollowInProgress}
        />
      )}

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link active" href="">
                    My Articles
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="">
                    Favorited Articles
                  </a>
                </li>
              </ul>
            </div>

            {articleList?.articles.map(article => (
              <ArticlePreview article={article} key={article.slug} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
