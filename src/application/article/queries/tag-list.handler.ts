import { inject } from 'njct';

import { TagService } from '../../interfaces';
import { Tag } from '../../tag/tag';

export class TagListHandler {
    constructor(
        private readonly tagService: TagService = inject<TagService>('tagservice'),
    ) {}

    async execute(): Promise<Tag[]> {
        return (await this.tagService.getAllTags()).filter(
            x => x.replace(/[^\u0020-\u007E]/g, '').length > 1,
        );
    }
}
