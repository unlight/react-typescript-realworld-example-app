import { createAction, createReducer, Dispatch } from '@reduxjs/toolkit';

export const defaultState = {
    data: undefined as string[] | undefined,
    loading: true,
    error: undefined,
};

export type State = typeof defaultState;
export type ConnectedProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

export const requestLoadTags = createAction('requestLoadTags');

export const tagReducer = createReducer(defaultState, {
    [requestLoadTags.type]: (state) => {
        state.loading = true;
    },
});

export function mapStateToProps(appState) {
    return {
        tags: appState.tag.data as string[] | undefined,
        loading: appState.tag.loading as boolean,
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        requestLoadTags: () => {
            dispatch(requestLoadTags());
        },
    };
}
