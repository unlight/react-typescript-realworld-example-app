import classNames from 'clsx';
import React from 'react';

type ToggleFavoritePostButtonProps = {
  toggleCallback: () => void;
  favorited: boolean;
  disabled: boolean;
  count: number;
};

export function ToggleFavoritePostButton(props: ToggleFavoritePostButtonProps) {
  const { favorited, disabled, count, toggleCallback } = props;
  return (
    <button
      className={classNames(
        'btn btn-sm pull-xs-right',
        favorited ? 'btn-primary' : 'btn-outline-primary',
        {
          disabled,
        },
      )}
      disabled={disabled}
      onClick={toggleCallback}
    >
      <i className="ion-heart"></i>
      &nbsp;
      <span className="counter">{count}</span>
    </button>
  );
}
