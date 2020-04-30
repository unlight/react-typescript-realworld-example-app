import { createAction } from '@reduxjs/toolkit';

import { AllState } from '../../types';

export const tagsLoadInProgress = createAction('tagsLoadInProgress', (value: boolean) => {
    return {
        payload: value,
    };
});

export const tagsLoadSuccess = createAction('tagsLoadSuccess', (tags: string[]) => {
    return {
        payload: tags,
    };
});

export const tagsLoadError = createAction('tagsLoadError', (err: unknown) => {
    return {
        payload: err,
    };
});

export const loadTags = () => async (dispatch, getState) => {
    const apiBase = (getState() as AllState).config.apiBase;
    try {
        const response = await fetch(`${apiBase}/tags`);
        const body = await response.json();
        dispatch(tagsLoadSuccess(body.tags));
    } catch (e) {
        dispatch(tagsLoadError(e));
    }
};
