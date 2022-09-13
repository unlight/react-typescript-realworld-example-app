import { atom } from 'recoil';

export const isLoading = atom({
  key: 'appIsLoading',
  default: false,
});
