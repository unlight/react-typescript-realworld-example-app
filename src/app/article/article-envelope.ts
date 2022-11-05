import type { ArticleCreateInput } from './article-create-input';
import { SingleArticle } from './single-article';

export interface ArticleEnvelope<T = ArticleCreateInput | SingleArticle> {
  article: T;
}
