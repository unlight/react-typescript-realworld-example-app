import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Interface } from '@libs/application';
import { ArticleCreateInput } from '@libs/application/article';
import { ArticleCreateCommand } from '@libs/application/article/commands/article-create.command';
import { isLoading } from '@libs/components/Loader';
import { inject } from 'njct';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { CreateArticleView } from './CreateArticleView';

function useData() {
  const setIsLoading = useSetRecoilState(isLoading);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<ArticleCreateInput & { tagList: any }>({
    resolver: classValidatorResolver(ArticleCreateInput),
    reValidateMode: 'onBlur',
    criteriaMode: 'all',
  });
  const [serverError, setServerError] = useState('');

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    isSubmitted,
    serverError,
    setServerError,
    setIsLoading,
  };
}

export function CreateArticle(): JSX.Element {
  const sessionService = inject<Interface.SessionService>('sessionservice');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    errors,
    isValid,
    isSubmitted,
    serverError,
    setServerError,
    setIsLoading,
  } = useData();

  if (!sessionService.isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  const onSubmit = handleSubmit(async data => {
    setIsLoading(true);
    const command = new ArticleCreateCommand();
    const result = await command.execute(data);
    setIsLoading(false);
    if (result.isErr()) {
      setServerError(result.unwrapErr().message);
      return;
    }
    const article = result.unwrap();
    navigate(`/article/${article.slug}`);
  });

  return (
    <CreateArticleView
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      serverError={serverError}
      disabled={isSubmitted && !isValid}
    />
  );
}
