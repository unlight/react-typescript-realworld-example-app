import React from 'react';

import { SettingsView } from './SettingsView';
import { useSettings } from './useSettings';

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
