import { Interface } from '@libs/application';
import { TagListHandler } from '@libs/application/article/queries';
import { Tag } from '@libs/application/tag';
import { inject } from 'njct';
import React from 'react';
import useSWR from 'swr';

type PopularTagsProps = {};

export function PopularTags(props: PopularTagsProps): JSX.Element {
    const tagService = inject<Interface.TagService>('tagservice');
    const { data: tags, error } = useSWR<Tag[]>('home/populartags', () => {
        return new TagListHandler(tagService).execute();
    });

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
                ) : error ? (
                    <p>ERROR</p>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
