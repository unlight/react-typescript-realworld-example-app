import { Interface } from '@libs/application';
import { ArticleList } from '@libs/application/article';
import { inject } from 'njct';
import React, { useEffect, useState } from 'react';

import { HomeView } from './HomeView';

export function Home(): JSX.Element {
    const articleService = inject<Interface.ArticleService>('articleservice');
    const [articleList, setArticleList] = useState<ArticleList | undefined>(undefined);
    useEffect(() => {
        function getArticleList() {
            articleService.findMany({}).then(
                articleList => {
                    setArticleList(articleList);
                },
                (err: unknown) => {
                    console.log('err', err);
                },
            );
        }
        getArticleList();
    }, []);

    return <HomeView articles={articleList?.articles} />;
}
