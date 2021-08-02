import React, { PropsWithChildren } from 'react';
import { atom, useRecoilValue } from 'recoil';

type LoaderProps = {};

export const isLoading = atom({
    key: 'appIsLoading',
    default: false,
});

export function Loader(props: PropsWithChildren<LoaderProps>) {
    const showLoading = useRecoilValue(isLoading);
    console.log('showLoading', showLoading);

    return showLoading ? (
        <div className="absolute inset-0 bg-opacity-25 bg-gray-500 h-screen place-items-center place-content-center flex">
            <p className="text-5xl -translate-y-full">Loading...</p>
        </div>
    ) : null;
}
