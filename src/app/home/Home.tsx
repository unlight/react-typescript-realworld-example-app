import { FeedValue, Interface } from '@libs/application';
import { ArticleList } from '@libs/application/article';
import {
    ArticleFeedHandler,
    ArticleListHandler,
} from '@libs/application/article/queries';
import { inject } from 'njct';
import React from 'react';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import useSWR from 'swr';

import { HomeView } from './HomeView';

// eslint-disable-next-line @typescript-eslint/ban-types
const queries = new Map<string, Function>([
    ['global', ArticleListHandler],
    ['mine', ArticleFeedHandler],
]);

export function Home({ location }: RouteComponentProps): JSX.Element {
    const articleService = inject<Interface.ArticleService>('articleservice');
    const feed = useFeed();
    const { data: articleList, error } = useSWR<ArticleList>(['articles', feed], () => {
        const query = Reflect.construct(queries.get(feed)!, [articleService]);
        return query.execute();
    });

    if (error) {
        return <p>{error}</p>;
    }

    return <HomeView articles={articleList?.articles} feed={feed} />;
}

function useFeed(): FeedValue {
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const result = search.get('feed');

    return result && ['feed', 'mine'].includes(result)
        ? (result as FeedValue)
        : 'global';
}
