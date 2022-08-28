import { inject } from 'njct';

import { ArticleList } from './article-list';
import { ArticleListQuery } from './article-list.query';
import { ArticleServiceInterface } from './article-service.interface';

export class ArticleFeedHandler {
  constructor(
    private readonly articleService = inject<ArticleServiceInterface>('articleservice'),
  ) {}

  async execute(data: ArticleListQuery = {}): Promise<ArticleList> {
    return await this.articleService.feed({
      take: data.limit ?? 5,
      skip: data.offset ?? 0,
    });
  }
}
