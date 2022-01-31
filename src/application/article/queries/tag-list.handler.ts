import { inject } from 'njct';

import { Tag, TagService } from '../../tag';

export class TagListHandler {
  constructor(private readonly tagService = inject<TagService>('tagservice')) {}

  async execute(): Promise<Tag[]> {
    return (await this.tagService.getAllTags()).filter(
      (x: string) => x.replace(/[^\u0020-\u007E]/g, '').length > 1,
    );
  }
}
