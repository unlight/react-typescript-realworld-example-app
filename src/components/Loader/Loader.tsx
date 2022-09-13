import React from 'react';
import { useRecoilValue } from 'recoil';

import { isLoading } from './is-loading.atom';
import { Loading } from './Loading';

export function Loader() {
  const showLoading = useRecoilValue(isLoading);

  return showLoading ? <>{Loading}</> : null;
}
