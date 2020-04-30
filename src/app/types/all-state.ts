import { AppState } from '../app.state';
import { State } from '../home/tag/tag.state';

export type AllState = AppState & {
    tag: State;
};
