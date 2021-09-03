import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Interface } from '@libs/application';
import { UserSettingsInput } from '@libs/application/user';
import { UserSettingsUpdateCommand } from '@libs/application/user/commands';
import { UserSettingsHandler } from '@libs/application/user/queries';
import { isLoading } from '@libs/ui/Loader';
import { inject } from 'njct';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import usePromise from 'react-use-promise';
import { useSetRecoilState } from 'recoil';

import { SettingsView } from './SettingsView';

function useSettings() {
  const setIsLoading = useSetRecoilState(isLoading);
  const [result] = usePromise(() => {
    return new UserSettingsHandler().execute();
  }, []);
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
      const { code } = result.unwrapErr();
      setServerError(`Failed to update settings, error code ${code}`);
    }
  });

  useEffect(() => {
    setIsLoading(!result);
    if (result?.isOk()) {
      reset(result.unwrap());
    }
  }, [reset, result, setIsLoading]);

  const logout = useCallback(async () => {
    const sessionService = inject<Interface.SessionService>('sessionservice');
    await sessionService.logout();
    document.location = '/';
  }, []);

  return {
    settingsResult: result,
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
  const { settingsResult, errors, register, serverError, onSubmit, logout } =
    useSettings();

  return (
    <SettingsView
      serverError={serverError}
      errors={errors}
      register={register}
      onSubmit={onSubmit}
      disabled={!settingsResult}
      logout={logout}
    />
  );
}
