import React, { useEffect, useState } from 'react';

import { HomeView } from './HomeView';
import { Interface } from '@libs/application';
import { inject } from 'njct';
import { ArticleList } from '@libs/application/article';

export function Home(): JSX.Element {
    const articleService = inject<Interface.ArticleService>('articleservice');
    const [articleList, setArticleList] = useState<ArticleList | undefined>(undefined);
    useEffect(() => {
        function getArticleList() {
            articleService.findMany({}).then(
                articleList => {
                    setArticleList(articleList);
                },
                err => {
                    console.log('err', err);
                },
            );
        }
        getArticleList();
    }, []);

    return <HomeView articles={articleList?.articles} />;
}
