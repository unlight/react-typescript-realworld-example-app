import { TagListHandler } from '@libs/application/article/queries';
import React from 'react';
import usePromise from 'react-use-promise';

type PopularTagsProps = {};

function useData() {
    const [tagList] = usePromise(() => {
        return new TagListHandler().execute();
    }, []);

    return { tagList };
}

export function PopularTags(props: PopularTagsProps): JSX.Element {
    const { tagList } = useData();

    return (
        <div className="sidebar">
            <p>Popular Tags</p>
            <div className="tag-list">
                {tagList ? (
                    tagList.map(tag => (
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
