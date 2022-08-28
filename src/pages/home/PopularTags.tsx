import { TagListHandler } from '@application/article';
import { useRequest } from 'ahooks';
import React from 'react';

export function PopularTags(): JSX.Element {
  const { data: tagList, loading } = useRequest(async () => {
    return new TagListHandler().execute();
  });

  return (
    <div className="sidebar">
      <p>Popular Tags</p>
      {loading ? (
        'Loading...'
      ) : (
        <div className="tag-list">
          {tagList?.map(tag => (
            <a key={tag} href="" className="tag-pill tag-default">
              {tag}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
