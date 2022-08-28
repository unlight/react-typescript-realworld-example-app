import { SessionServiceInterface } from '@application';
import { UserSettingsInput } from '@application/user';
import { UserSettingsUpdateCommand } from '@application/user/commands';
import { UserSettingsHandler } from '@application/user/queries';
import { isLoading } from '@components/Loader';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useRequest } from 'ahooks';
import { inject } from 'njct';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

import { SettingsView } from './SettingsView';

async function requestSettings() {
  const command = new UserSettingsHandler();
  const result = await command.execute();
  return result.unwrap();
}

function useSettings() {
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
    setIsLoading(true);
    const result = await new UserSettingsUpdateCommand().execute(data);
    setIsLoading(false);
    if (result.isErr()) {
      const { message } = result.unwrapErr();
      setServerError(`Failed to update settings, error message ${message}`);
    }
  });

  useEffect(() => {
    void runAsync().then(userSettings => {
      reset(userSettings);
    });
  }, [runAsync, reset]);

  const logout = useCallback(async () => {
    const sessionService = inject<SessionServiceInterface>('sessionservice');
    await sessionService.logout();
    document.location = '/';
  }, []);

  return {
    userSettings,
    setIsLoading,
    register,
    errors,
    handleSubmit,
    setError,
    serverError,
    setServerError,
    onSubmit,
    logout,
  };
}

export function Settings(): JSX.Element {
  const { userSettings, errors, register, serverError, onSubmit, logout } =
    useSettings();

  return (
    <SettingsView
      serverError={serverError}
      errors={errors}
      register={register}
      onSubmit={onSubmit}
      disabled={!userSettings}
      logout={logout}
    />
  );
}
