import { SessionServiceInterface, Tokens } from '@application';
import { ArticleCreateInput, ArticleServiceInterface } from '@application/article';
import { isLoading } from '@components/Loader';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { inject } from 'njct';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { CreateArticleView } from './CreateArticleView';

function useData() {
  const navigate = useNavigate();
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

  const onSubmit = handleSubmit(async data => {
    const articleService = inject<ArticleServiceInterface>(Tokens.ArticleService);
    setIsLoading(true);
    const result = await articleService.create(data);
    setIsLoading(false);
    if (result.isErr()) {
      setServerError(result.unwrapErr().message);
      return;
    }
    const article = result.unwrap();
    navigate(`/article/${article.slug}`);
  });

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    isSubmitted,
    serverError,
    setServerError,
    setIsLoading,
    onSubmit,
  };
}

export function CreateArticle(): JSX.Element {
  const sessionService = inject<SessionServiceInterface>('sessionservice');
  const { register, errors, isValid, isSubmitted, serverError, onSubmit } = useData();

  if (!sessionService.isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  return (
    <CreateArticleView
      onSubmit={onSubmit}
      register={register}
      errors={errors as any}
      serverError={serverError}
      disabled={isSubmitted && !isValid}
    />
  );
}
