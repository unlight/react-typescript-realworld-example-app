import { inject } from 'njct';

import { ArticleServiceInterface } from '..';
import { ArticleList } from '../article-list';
import { ArticleListQuery } from './article-list.query';

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
