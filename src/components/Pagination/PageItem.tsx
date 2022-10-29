import classNames from 'clsx';
import React, { useCallback } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

type PageItemProps = {
  active?: boolean;
  link: number | string;
  page: number;
};

export function PageItem(props: PageItemProps) {
  const { active, page, link } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const clickHandler = useCallback(() => {
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
  }, [page, searchParams, setSearchParams]);

  return (
    <li
      className={classNames('page-item', {
        active,
      })}
    >
      <NavLink
        className="page-link"
        onClick={clickHandler}
        to={`?page=${page}`}
      >
        {link}
      </NavLink>
    </li>
  );
}
