import { Interface } from '@libs/application';
import { ArticleList } from '@libs/application/article';
import {
    ArticleFeedHandler,
    ArticleListHandler,
} from '@libs/application/article/queries';
import { inject } from 'njct';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useSWR from 'swr';

import { HomeView } from './HomeView';

// eslint-disable-next-line @typescript-eslint/ban-types
const queries = new Map<string, Function>([
    ['/', ArticleListHandler],
    ['/feed', ArticleFeedHandler],
]);

export function Home({ location }: RouteComponentProps): JSX.Element {
    const articleService = inject<Interface.ArticleService>('articleservice');
    const { data: articleList, error } = useSWR<ArticleList>(
        ['articles', location.pathname],
        () => {
            const query = Reflect.construct(queries.get(location.pathname)!, [
                articleService,
            ]);
            return query.execute();
        },
    );

    if (error) {
        return <p>{error}</p>;
    }

    return <HomeView articles={articleList?.articles} />;
}
