import { Interface } from '@libs/application';
import { ArticleList } from '@libs/application/article';
import { ArticleListHandler, TagListHandler } from '@libs/application/article/queries';
import { Tag } from '@libs/application/tag';
import { inject } from 'njct';
import React from 'react';
import useSWR from 'swr';

import { HomeView } from './HomeView';

export function Home(): JSX.Element {
    const articleService = inject<Interface.ArticleService & Interface.TagService>(
        'articleservice',
    );
    const { data: articleList, error } = useSWR<ArticleList>('home/articles', () => {
        return new ArticleListHandler(articleService).execute();
    });
    const { data: tagList } = useSWR<Tag[]>('home/populartags', () => {
        return new TagListHandler(articleService).execute();
    });

    if (error) {
        return <p>{error}</p>;
    }

    return <HomeView articles={articleList?.articles} tags={tagList} />;
}
