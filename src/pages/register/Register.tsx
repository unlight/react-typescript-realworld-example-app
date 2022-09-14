import React from 'react';
import { Navigate } from 'react-router-dom';

import { RegisterView } from './RegisterView';
import { useRegister } from './useRegister';

export function Register(): JSX.Element {
  const { onSubmit, errors, register, serverErrorMessage, isLoggedIn } = useRegister();

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <RegisterView
      onSubmit={onSubmit}
      errors={errors}
      register={register}
      serverErrorMessage={serverErrorMessage}
    />
  );
}
