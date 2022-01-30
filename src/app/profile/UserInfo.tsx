import { Interface } from '@libs/application';
import { ToggleFollowButton } from '@libs/components';
import React from 'react';

export function UserInfo({
  profile,
  toggleFollow,
  disableToggleFollow,
}: {
  profile: Interface.Profile;
  toggleFollow: () => unknown;
  disableToggleFollow: boolean;
}) {
  return (
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            {profile.image && (
              <img src={profile.image} className="user-img inline-block" />
            )}
            <h4>{profile.username}</h4>
            {profile.bio && <p>{profile.bio}</p>}
            <ToggleFollowButton
              toggleFollow={toggleFollow}
              disabled={disableToggleFollow}
              following={profile.following}
              username={profile.username}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
