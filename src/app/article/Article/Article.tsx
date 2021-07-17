import { Interface } from '@libs/application';
import { inject } from 'njct';
import React, { useCallback, useEffect } from 'react';
import { RouteComponentProps } from 'wouter';

import { ArticleView } from './ArticleView';

export function Article({ params }: RouteComponentProps): JSX.Element {
    const articleService = inject<Interface.ArticleService>('articleservice');
    const { slug } = params;
    console.log('slug1', slug);

    const getArticle = useCallback(
        async slug => {
            console.log('slug2', slug);
            const article = await articleService.findOne(slug!);
            console.log('article1', article);
            return article;
        },
        [slug],
    );

    useEffect(() => {
        getArticle(slug);
    }, [slug]);

    return <ArticleView />;
}
