import { Interface } from '@libs/application';
import { GetProfileHandler } from '@libs/application/profile';
import { isLoading } from '@libs/components/Loader';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { ArticlePreview } from '../article/Article';

function useProfile() {
  const setIsLoading = useSetRecoilState(isLoading);
  const { username } = useParams();
  const [serverError, setServerError] = useState('');
  const [{ profile, articleList }, setProfile] = useState<{
    profile?: Interface.Profile;
    articleList?: Interface.ArticleList;
  }>({});

  useEffect(() => {
    setIsLoading(true);
    void (async () => {
      const result = await new GetProfileHandler().execute(username!);
      setIsLoading(false);
      if (result.isErr()) {
        return setServerError(result.unwrapErr().message);
      }
      const { profile, articleList } = result.unwrap();
      setProfile({ profile, articleList });
    })();
  }, [username, setIsLoading]);

  return { serverError, profile, articleList };
}

export function Profile() {
  const { profile, articleList, serverError } = useProfile();

  return (
    <div className="profile-page">
      {profile && (
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                {profile.image && (
                  <img src={profile.image} className="user-img inline-block" />
                )}
                <h4>{profile.username}</h4>
                {profile.bio && <p>{profile.bio}</p>}
                <button className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-plus-round"></i>
                  &nbsp; Follow {profile.username}
                </button>
              </div>
            </div>
          </div>
        </div>
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

            {articleList &&
              articleList.articles.map(article => (
                <ArticlePreview article={article} key={article.slug} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
