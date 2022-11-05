import { Tag } from './tag';

export interface TagService {
  getAllTags(): Promise<Tag[]>;
}
