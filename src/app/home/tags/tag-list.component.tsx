import React, { useEffect } from 'react';
import { TagItem } from './tag-item.component';
import { TagsContainer } from './tags.container';
import { useContainer } from 'unstated-next';

export function TagList() {
    const tags = TagsContainer.useContainer();

    return (
        <>
            <p>Popular Tags</p>

            <div className="tag-list">
                {tags.map((tag) => (
                    <TagItem />
                ))}
            </div>
        </>
    );
}
