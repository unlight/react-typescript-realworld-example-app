import { Tag } from '@libs/application/tag';
import React from 'react';

type PopularTagsProps = {
    tags?: Tag[];
};

export function PopularTags(props: PopularTagsProps): JSX.Element {
    const { tags } = props;
    return (
        <div className="sidebar">
            <p>Popular Tags</p>
            <div className="tag-list">
                {tags ? (
                    tags.map(tag => (
                        <a key={tag} href="" className="tag-pill tag-default">
                            {tag}
                        </a>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
