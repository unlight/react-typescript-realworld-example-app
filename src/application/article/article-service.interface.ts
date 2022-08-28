import { Result } from 'rsts';

import { ArticleFindManyArgs } from './article-find-many-args';
import { ArticleList } from './article-list';
import { SingleArticle } from './single-article';

export interface ArticleServiceInterface {
  create(data: any): Promise<Result<SingleArticle, Error>>;
  update(data: any): Promise<SingleArticle>;
  delete(data: any): Promise<void>;
  findMany(args?: ArticleFindManyArgs): Promise<Result<ArticleList, Error>>;
  favorite(articleId: string): Promise<SingleArticle>;
  unfavorite(articleId: string): Promise<SingleArticle>;
  findOne(articleId: string): Promise<SingleArticle>;
  feed(args: ArticleFindManyArgs): Promise<ArticleList>;
}
