import { useRequest } from 'ahooks';
import { inject } from 'njct';
import React from 'react';
import { TagService } from '@application/tag';

export function PopularTags(): JSX.Element {
  const { data: tagList, loading } = useRequest(async () => {
    const tagService = inject<TagService>('tagservice');
    return tagService.getAllTags();
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
