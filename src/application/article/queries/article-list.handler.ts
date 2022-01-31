import { inject } from 'njct';

import { ArticleList, ArticleService } from '..';
import { ArticleListQuery } from './article-list.query';

export class ArticleListHandler {
  constructor(
    private readonly articleService = inject<ArticleService>('articleservice'),
  ) {}

  // todo: result monad
  async execute(data: ArticleListQuery = {}): Promise<ArticleList> {
    return await this.articleService.findMany({
      take: data.limit ?? 5,
      skip: data.offset ?? 0,
      author: data.author,
    });
  }
}
