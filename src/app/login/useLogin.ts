import { SessionServiceInterface, Tokens } from '@application';
import { inject } from 'njct';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { LoginFormData } from './types';

export function useLogin() {
  const sessionService = inject<SessionServiceInterface>(Tokens.SessionService);
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const { register, handleSubmit } = useForm<LoginFormData>();
  const onSubmit = handleSubmit(async data => {
    try {
      await sessionService.login(data);
      document.location = '/';
    } catch (err: any) {
      setServerErrorMessage(err.message);
    }
  });

  return {
    serverErrorMessage,
    onSubmit,
    register,
  };
}
