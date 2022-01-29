import { Interface } from '@libs/application';
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
            <button
              className="btn btn-sm btn-outline-secondary action-btn"
              onClick={toggleFollow}
              disabled={disableToggleFollow}
            >
              <i className="ion-plus-round"></i>
              &nbsp; {profile.following ? 'Unfollow' : 'Follow'} {profile.username}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
