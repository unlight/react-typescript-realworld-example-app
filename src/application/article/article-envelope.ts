import { Article } from './article';
import type { ArticleCreateInput } from './article-create-input';

export interface ArticleEnvelope<T = ArticleCreateInput | Article> {
    article: T;
}
