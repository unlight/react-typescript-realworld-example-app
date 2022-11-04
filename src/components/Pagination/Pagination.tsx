import React from 'react';

import { PageItem } from './PageItem';

type PaginationProps = {
  total: number;
  current?: number;
};

export function Pagination(props: PaginationProps) {
  return (
    <nav>
      <ul className="pagination">
        <PageItem page={1} />
        <PageItem page={2} />
      </ul>
    </nav>
  );
}
