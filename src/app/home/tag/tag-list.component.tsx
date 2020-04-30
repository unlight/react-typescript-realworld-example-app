import React, { useEffect } from 'react';

import { TagItem } from './tag-item.component';

export function TagList({ tags = [], requestLoadTags }: ConnectedProps) {
    useEffect(requestLoadTags, []);

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
