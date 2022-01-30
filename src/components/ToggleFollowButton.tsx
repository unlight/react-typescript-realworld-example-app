import React from 'react';

type ToggleFollowButtonProps = {
  following: boolean;
  toggleFollow: () => unknown;
  disabled: boolean;
  username: string;
  count?: number;
};

export function ToggleFollowButton(props: ToggleFollowButtonProps) {
  const { toggleFollow, following, username, disabled, count } = props;
  return (
    <button
      className="btn btn-sm btn-outline-secondary action-btn"
      onClick={toggleFollow}
      disabled={disabled}
    >
      <i className="ion-plus-round"></i>
      &nbsp; {following ? 'Unfollow' : 'Follow'} {username}
      {count !== undefined && (
        <>
          {' '}
          <span className="counter">({count})</span>
        </>
      )}
    </button>
  );
}
