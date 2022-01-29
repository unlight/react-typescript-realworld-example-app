import { Interface } from '@libs/application';
import {
  FollowUserCommand,
  GetProfileHandler,
  Profile,
} from '@libs/application/profile';
import { UnfollowUserCommand } from '@libs/application/profile/commands/unfollow-user.command';
import { isLoading } from '@libs/components/Loader';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Result } from 'rsts';

import { ArticlePreview } from '../article/Article';
import { UserInfo } from './UserInfo';

function useProfile() {
  const setIsLoading = useSetRecoilState(isLoading);
  const { username } = useParams();
  const [serverError, setServerError] = useState('');
  const [{ profile, articleList, toggleFollowInProgress }, setProfile] = useState<{
    profile?: Interface.Profile;
    articleList?: Interface.ArticleList;
    toggleFollowInProgress: boolean;
  }>({
    toggleFollowInProgress: false,
  });

  useEffect(() => {
    setIsLoading(true);
    void (async () => {
      // todo: Maybe use https://github.com/rauldeheer/use-async-effect
      const result = await new GetProfileHandler().execute(username!);
      setIsLoading(false);
      if (result.isErr()) {
        return setServerError(result.unwrapErr().message);
      }
      const { profile, articleList } = result.unwrap();
      setProfile({ profile, articleList, toggleFollowInProgress });
    })();
  }, [username, setIsLoading, toggleFollowInProgress]);

  const toggleFollow = useCallback(async () => {
    const name = profile?.username;
    if (name) {
      setProfile({
        profile,
        articleList,
        toggleFollowInProgress: true,
      });

      let result: Result<Profile, Error>;
      if (profile.following) {
        const command = new UnfollowUserCommand();
        result = await command.execute(name);
      } else {
        const command = new FollowUserCommand();
        result = await command.execute(name);
      }

      setProfile({
        profile: result.unwrap(),
        articleList,
        toggleFollowInProgress: false,
      });
    }
  }, [profile, articleList]);

  return { serverError, profile, articleList, toggleFollow, toggleFollowInProgress };
}

export function Profile() {
  const { profile, articleList, serverError, toggleFollow, toggleFollowInProgress } =
    useProfile();

  return (
    <div className="profile-page">
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
