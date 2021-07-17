import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Interface } from '@libs/application';
import { ArticleCreateInput } from '@libs/application/article';
import { inject } from 'njct';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, useLocation } from 'wouter';

import { CreateArticleView } from './CreateArticleView';

export function CreateArticle(): JSX.Element {
    const articleService = inject<Interface.ArticleService>('articleservice');
    const authenticationService = inject<Interface.AuthenticationService>(
        'authenticationservice',
    );
    const { 1: navigateTo } = useLocation();
    const [serverErrorMessage, setServerErrorMessage] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitted },
    } = useForm<ArticleCreateInput & { tagList: any }>({
        resolver: classValidatorResolver(ArticleCreateInput),
        reValidateMode: 'onBlur',
        criteriaMode: 'all',
    });

    if (!authenticationService.isLoggedIn()) {
        return <Redirect to="/login" />;
    }

    const onSubmit = handleSubmit(async data => {
        try {
            const article = await articleService.create(data);
            navigateTo(`/article/${article.slug}`);
        } catch (err) {
            setServerErrorMessage(err?.message || 'Unknown error');
        }
    });

    return (
        <CreateArticleView
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            serverErrorMessage={serverErrorMessage}
            disabled={isSubmitted && !isValid}
        />
    );
}
