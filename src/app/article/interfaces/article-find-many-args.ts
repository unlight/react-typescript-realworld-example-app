import { ArticleWhereInput } from './article-where-input';

export interface ArticleFindManyArgs {
  where?: ArticleWhereInput;
  take?: number;
  skip?: number;
  author?: string;
}
