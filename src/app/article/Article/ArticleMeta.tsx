import { SingleArticle } from '@libs/application/article';
import {
  FollowUserCommand,
  Profile,
  UnfollowUserCommand,
} from '@libs/application/profile';
import { Author } from '@libs/application/user';
import { ToggleFavoritePostButton, ToggleFollowButton } from '@libs/components';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Result } from 'rsts';

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
    setProfile({
      profile,
      toggleFollowInProgress: true,
    });

    let result: Result<Profile, Error>;
    if (profile.following) {
      const command = new UnfollowUserCommand();
      result = await command.execute(profile.username);
    } else {
      const command = new FollowUserCommand();
      result = await command.execute(profile.username);
    }

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
  const { author, toggleFollow, toggleFollowInProgress } = useArticleMeta(props.author);
  const { article, requestInProgress, toggleCallback } = useTogglefavoriteArticle(
    props.article,
  );

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
