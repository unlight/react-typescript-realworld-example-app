import classNames from 'clsx';
import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

type PageItemProps = {
  active?: boolean;
  page: number;
};

export function PageItem(props: PageItemProps) {
  const { active, page } = props;
  const [searchParams] = useSearchParams();

  searchParams.set('page', page.toString());

  return (
    <li
      className={classNames('page-item', {
        active,
      })}
    >
      <NavLink className="page-link" to={`?${searchParams.toString()}`}>
        {page}
      </NavLink>
    </li>
  );
}
