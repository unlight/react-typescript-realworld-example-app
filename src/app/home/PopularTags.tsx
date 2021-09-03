import { TagListHandler } from '@libs/application/article/queries';
import { Tag } from '@libs/application/tag';
import React from 'react';
import { usePromise } from 'react-pending-resource';

type PopularTagsProps = {
  tagList?: Tag[];
};

export function PopularTags(props: PopularTagsProps): JSX.Element {
  const tagList = usePromise(
    'tags',
    () => props.tagList ?? new TagListHandler().execute(),
  );

  return (
    <div className="sidebar">
      <p>Popular Tags</p>
      <div className="tag-list">
        {tagList.map(tag => (
          <a key={tag} href="" className="tag-pill tag-default">
            {tag}
          </a>
        ))}
      </div>
    </div>
  );
}
