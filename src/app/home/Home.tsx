import { Interface } from '@libs/application';
import { ArticleList } from '@libs/application/article';
import { ArticleListHandler } from '@libs/application/article/queries';
import { inject } from 'njct';
import React, { useEffect, useState } from 'react';

import { HomeView } from './HomeView';

export function Home(): JSX.Element {
    const articleService = inject<Interface.ArticleService>('articleservice');
    const [articleList, setArticleList] = useState<ArticleList | undefined>(undefined);
    useEffect(() => {
        const handler = new ArticleListHandler(articleService);
        handler
            .execute({})
            .then(articleList => {
                setArticleList(articleList);
            })
            .catch((err: unknown) => {
                console.log('err', err);
                setArticleList(undefined);
            });
    }, [articleService]);

    return <HomeView articles={articleList?.articles} />;
}
