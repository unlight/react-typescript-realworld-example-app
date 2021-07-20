import { Interface } from '@libs/application';

import { Tag } from '../../tag/tag';

export class TagListHandler {
    constructor(private readonly tagService: Interface.TagService) {}

    async execute(): Promise<Tag[]> {
        return (await this.tagService.getAllTags()).filter(
            x => x.replace(/[^\u0020-\u007E]/g, '').length > 1,
        );
    }
}
