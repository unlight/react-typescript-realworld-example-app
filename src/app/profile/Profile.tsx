import { ArticleList } from '@libs/application';
import {
  FollowUserCommand,
  GetProfileHandler,
  Profile as ApplicationProfile,
} from '@libs/application/profile';
import { UnfollowUserCommand } from '@libs/application/profile/commands/unfollow-user.command';
import { isLoading } from '@libs/components/Loader';
import { useRequest } from 'ahooks';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Result } from 'rsts';

import { ArticlePreview } from '../article/Article';
import { UserInfo } from './UserInfo';

async function fetchProfile(name: string) {
  const result = await new GetProfileHandler().execute(name);
  if (result.isErr()) {
    throw new Error('Fetch profile error');
  }
  return result.unwrap();
}

function useProfile() {
  const setIsLoading = useSetRecoilState(isLoading);
  const { username } = useParams() as { username: string };
  const [serverError, setServerError] = useState('');
  const [{ profile, articleList, toggleFollowInProgress }, setProfile] = useState<{
    profile?: ApplicationProfile;
    articleList?: ArticleList;
    toggleFollowInProgress: boolean;
  }>({
    toggleFollowInProgress: false,
  });

  const { run } = useRequest(fetchProfile, {
    manual: true,
    onBefore: () => {
      setIsLoading(true);
    },
    onSuccess: data => {
      setProfile({
        profile: data.profile,
        articleList: data.articleList,
        toggleFollowInProgress,
      });
    },
    onError: error => {
      setServerError(error.message);
    },
    onFinally: () => {
      setIsLoading(false);
    },
  });

  useEffect(() => {
    run(username);
  }, [run, username]);

  const toggleFollow = useCallback(async () => {
    const name = profile?.username;
    if (name) {
      setProfile({
        profile,
        articleList,
        toggleFollowInProgress: true,
      });

      let result: Result<ApplicationProfile, Error>;
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
