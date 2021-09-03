import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Interface } from '@libs/application';
import { UserCreateInput } from '@libs/application/user';
import { UserRegisterCommand } from '@libs/application/user/commands';
import { inject } from 'njct';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';

import { RegisterView } from './RegisterView';

function useData() {
  const userService = inject<Interface.UserService>('userservice');
  const sessionService = inject<Interface.SessionService>('sessionservice');
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCreateInput>({
    resolver: classValidatorResolver(UserCreateInput),
    reValidateMode: 'onBlur',
    criteriaMode: 'all',
  });
  const onSubmit = handleSubmit(async data => {
    const command = new UserRegisterCommand(userService);
    const result = await command.execute(data);
    result.match({
      ok: () => {
        document.location = '/';
      },
      err: error => {
        setServerErrorMessage(error.message);
      },
    });
  });
  const isLoggedIn = sessionService.isLoggedIn();

  return {
    isLoggedIn,
    onSubmit,
    errors,
    register,
    serverErrorMessage,
  };
}

export function Register(): JSX.Element {
  const { onSubmit, errors, register, serverErrorMessage, isLoggedIn } = useData();

  if (isLoggedIn) {
    return <Redirect to="/" />;
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
