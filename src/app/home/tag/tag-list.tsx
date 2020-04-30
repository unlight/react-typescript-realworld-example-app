import React, { useEffect } from 'react';

import { TagItem } from './tag-item';
import { ConnectedProps } from './tag.state';

export function TagList({ loading, tags = [], requestLoadTags }: ConnectedProps) {
    useEffect(requestLoadTags, []);

    return (
        <>
            <p>Popular Tags</p>
            {loading ? (
                <div>Loading…</div>
            ) : (
                <div className="tag-list">
                    {tags.map((tag) => (
                        <TagItem key={tag} name={tag} />
                    ))}
                </div>
            )}
        </>
    );
}
