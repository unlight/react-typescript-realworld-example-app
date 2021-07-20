import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Interface } from '@libs/application';
import { ArticleCreateInput } from '@libs/application/article';
import { ArticleCreateCommand } from '@libs/application/article/commands/article-create.command';
import { inject } from 'njct';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, useHistory } from 'react-router-dom';

import { CreateArticleView } from './CreateArticleView';

export function CreateArticle(): JSX.Element {
    const articleService = inject<Interface.ArticleService>('articleservice');
    const authenticationService = inject<Interface.AuthenticationService>(
        'authenticationservice',
    );
    const { push } = useHistory();
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
    const command = new ArticleCreateCommand(articleService, authenticationService);

    if (!authenticationService.isLoggedIn()) {
        return <Redirect to="/login" />;
    }

    const onSubmit = handleSubmit(async data => {
        const result = await command.execute(data);
        if (result.isErr()) {
            setServerErrorMessage(result.unwrapErr().message);
            return;
        }
        const article = result.unwrap();
        push(`/article/${article.slug}`);
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
