import { SessionServiceInterface, Tokens, UserService } from '@application';
import { UserCreateInput } from '@application/user';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { inject } from 'njct';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function useRegister() {
  const userService = inject<UserService>(Tokens.UserService);
  const sessionService = inject<SessionServiceInterface>(Tokens.SessionService);
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
    const result = await userService.register(data);
    result.match({
      Ok: () => {
        document.location = '/';
      },
      Err: error => {
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
