import { ArticleWhereInput } from './article-where-input';

export class ArticleFindManyArgs {
    where?: ArticleWhereInput;
    take?: number;
    skip?: number;
}
