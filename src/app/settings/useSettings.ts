import { isLoading } from '@components/Loader';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useRequest } from 'ahooks';
import { inject } from 'njct';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

import { SessionServiceInterface } from '../auth';
import * as Tokens from '../tokens';
import { UserService, UserSettingsInput } from '../user';

async function requestSettings() {
  const userService = inject<UserService>(Tokens.UserService);
  const result = await userService.getCurrentUser();

  return result.unwrap();
}

export function useSettings() {
  const setIsLoading = useSetRecoilState(isLoading);
  const { runAsync, data: userSettings } = useRequest(requestSettings, {
    manual: true,
    onBefore: () => {
      setIsLoading(true);
    },
    onFinally: () => {
      setIsLoading(false);
    },
  });
  const {
    setError,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSettingsInput>({
    resolver: classValidatorResolver(UserSettingsInput),
    reValidateMode: 'onBlur',
    criteriaMode: 'all',
  });
  const [serverError, setServerError] = useState('');

  const onSubmit = handleSubmit(async data => {
    const userService = inject<UserService>(Tokens.UserService);
    setIsLoading(true);
    const result = await userService.updateCurrentUser(data);
    setIsLoading(false);
    if (result.isErr()) {
      const { message } = result.unwrapErr();
      setServerError(`Failed to update settings, error message ${message}`);
    }
  });

  useEffect(() => {
    void runAsync().then(userSettings => reset(userSettings));
  }, [runAsync, reset]);

  const logout = useCallback(async () => {
    const sessionService = inject<SessionServiceInterface>(
      Tokens.SessionService,
    );
    await sessionService.logout();
    document.location = '/';
  }, []);

  return {
    userSettings,
    setIsLoading,
    register,
    errors,
    setError,
    serverError,
    setServerError,
    onSubmit,
    logout,
  };
}
