import { SessionServiceInterface } from '@application';
import { inject } from 'njct';
import React from 'react';
import { Navigate } from 'react-router-dom';

import { CreateArticleView } from './CreateArticleView';

export function CreateArticlePage(): JSX.Element {
  const sessionService = inject<SessionServiceInterface>('sessionservice');
  const { register, errors, isValid, isSubmitted, serverError, onSubmit } =
    useData();

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
