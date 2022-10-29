import React, { useState } from 'react';

import { PageItem } from './PageItem';

type PaginationProps = {
  total: number;
  current?: number;
};

export function Pagination(props: PaginationProps) {
  const { total, current = 1 } = props;
  const [currentLink, setCurrentLink] = useState(current);

  return (
    <nav>
      <ul className="pagination">
        <PageItem link="First" page={1} />
        <PageItem link="Previous" page={current - 1} />
        <PageItem link={current} page={current} />
        <PageItem link="Next" page={current + 1} />
        <PageItem link="Last" />
      </ul>
    </nav>
  );
}
