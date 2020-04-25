import { TagsContainer } from './tags.container';
import { TagList } from './tag-list.component';
import React from 'react';

const initialState = { url: 'https://conduit.productionready.io/api/tags' };

export default function Tags() {
    return (
        <TagsContainer.Provider initialState={initialState}>
            <TagList />
        </TagsContainer.Provider>
    );
}
