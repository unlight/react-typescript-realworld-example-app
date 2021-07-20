import { Interface } from '@libs/application';

import { ArticleList } from '../article-list';
import { ArticleListQuery } from './article-list.query';

export class ArticleListHandler {
    constructor(private readonly articleService: Interface.ArticleService) {}

    async execute(data: ArticleListQuery): Promise<ArticleList> {
        return await this.articleService.findMany({
            take: data.limit ?? 5,
            skip: data.offset ?? 0,
        });
    }
}
