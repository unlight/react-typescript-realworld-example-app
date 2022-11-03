import { Tokens } from '@application';
import { SingleArticle } from '@application/article';
import { Profile } from '@application/profile';
import { Author, UserService } from '@application/user';
import { ToggleFavoritePostButton, ToggleFollowButton } from '@components';
import { inject } from 'njct';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { useTogglefavoriteArticle } from './use-toggle-favorite-article.hook';

function useArticleMeta(author: Author) {
  const [{ profile, toggleFollowInProgress }, setProfile] = useState<{
    profile: Profile;
    toggleFollowInProgress: boolean;
  }>({
    profile: author,
    toggleFollowInProgress: false,
  });

  const toggleFollow = useCallback(async () => {
    const userService = inject<UserService>(Tokens.UserService);
    setProfile({
      profile,
      toggleFollowInProgress: true,
    });

    const result = await (profile.following
      ? userService.unfollowUser(author.username)
      : userService.followUser(author.username));

    setProfile({
      profile: result.unwrap(),
      toggleFollowInProgress: false,
    });
  }, [profile]);

  return { toggleFollow, toggleFollowInProgress, author: profile };
}

type ArticleMetaProps = {
  article: SingleArticle;
  author: Author;
  createdAt: string;
  showFollowButton?: boolean;
};

export function ArticleMeta(props: ArticleMetaProps): JSX.Element {
  const { showFollowButton = false, createdAt } = props;
  const { author, toggleFollow, toggleFollowInProgress } = useArticleMeta(
    props.author,
  );
  const { article, requestInProgress, toggleCallback } =
    useTogglefavoriteArticle(props.article);

  return (
    <div className="article-meta">
      <Link to={`/profile/${author.username}`}>
        <img src={author.image} />
      </Link>
      <div className="info">
        <Link to={`/profile/${author.username}`} className="author">
          {author.username}
        </Link>
        <span className="date">{createdAt}</span>
      </div>
      {showFollowButton && (
        <ToggleFollowButton
          following={author.following}
          username={author.username}
          disabled={toggleFollowInProgress}
          toggleFollow={toggleFollow}
        />
      )}
      <ToggleFavoritePostButton
        disabled={requestInProgress}
        toggleCallback={toggleCallback}
        favorited={article.favorited}
        count={article.favoritesCount}
      />
    </div>
  );
}
