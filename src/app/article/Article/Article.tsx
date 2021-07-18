import { Interface } from '@libs/application';
import { Article as SingleArticle } from '@libs/application/article';
import { inject } from 'njct';
import React, { useCallback, useEffect, useState } from 'react';
import { RouteComponentProps } from 'wouter';

import { ArticleView } from './ArticleView';

export function Article({ params }: RouteComponentProps): JSX.Element {
    const articleService = inject<Interface.ArticleService>('articleservice');
    const { slug } = params;
    console.log('slug1', slug);

    const [article, setArticle] = useState<SingleArticle | undefined>(undefined);

    const getArticle = useCallback(
        async slug => {
            debugger;
            console.log('slug2', slug);
            const article = await articleService.findOne(slug!);
            setArticle(article);
        },
        [articleService],
    );

    useEffect(() => {
        void getArticle(slug);
    }, [slug, getArticle]);

    return <ArticleView article={article} />;
}
