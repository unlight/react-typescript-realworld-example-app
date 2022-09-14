import { ArticleList, ArticleServiceInterface } from '@application/article';
import { FollowUserCommand, Profile } from '@application/profile';
import { UnfollowUserCommand } from '@application/profile/commands/unfollow-user.command';
import { UserService } from '@application/user';
import { isLoading } from '@components/Loader';
import { useRequest } from 'ahooks';
import { inject } from 'njct';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Result } from 'rsts';

type FetchProfileResult = { profile: Profile; articleList: ArticleList };
type State = {
  profile?: Profile;
  articleList?: ArticleList;
  toggleFollowInProgress: boolean;
};

async function fetchProfile(username: string): Promise<FetchProfileResult> {
  const userService = inject<UserService>('userservice');
  const articleService = inject<ArticleServiceInterface>('articleservice');

  const [profile, articleList] = await Promise.all([
    userService.getProfile(username),
    articleService.findMany({ author: username }),
  ]);

  return { profile, articleList: articleList.unwrap() };
}

export function useProfile() {
  const setIsLoading = useSetRecoilState(isLoading);
  const { username } = useParams() as { username: string };
  const [serverError, setServerError] = useState('');
  const [{ profile, articleList, toggleFollowInProgress }, setProfile] =
    useState<State>({ toggleFollowInProgress: false });

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

  return {
    serverError,
    profile,
    articleList,
    toggleFollow,
    toggleFollowInProgress,
  };
}
