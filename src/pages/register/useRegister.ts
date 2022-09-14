import { SessionServiceInterface, UserService } from '@application';
import { UserCreateInput } from '@application/user';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { inject } from 'njct';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function useRegister() {
  const userService = inject<UserService>('userservice');
  const sessionService = inject<SessionServiceInterface>('sessionservice');
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
