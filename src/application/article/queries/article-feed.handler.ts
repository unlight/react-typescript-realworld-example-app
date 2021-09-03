import { inject } from 'njct';

import { ArticleService } from '../../interfaces';
import { ArticleList } from '../article-list';
import { ArticleListQuery } from './article-list.query';

export class ArticleFeedHandler {
  constructor(
    private readonly articleService: ArticleService = inject<ArticleService>(
      'articleservice',
    ),
  ) {}

  async execute(data: ArticleListQuery = {}): Promise<ArticleList> {
    return await this.articleService.feed({
      take: data.limit ?? 5,
      skip: data.offset ?? 0,
    });
  }
}
