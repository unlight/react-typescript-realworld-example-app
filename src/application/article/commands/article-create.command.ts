import { inject } from 'njct';
import { Err, Ok, Result } from 'rsts';

import { SessionService } from '../..';
import { ArticleCreateInput, ArticleService, SingleArticle } from '..';

export class ArticleCreateCommand {
  constructor(
    private readonly articleService = inject<ArticleService>('articleservice'),
    private readonly sessionService = inject<SessionService>('sessionservice'),
  ) {}

  async execute(data: ArticleCreateInput): Promise<Result<SingleArticle, Error>> {
    let result: Result<SingleArticle, Error>;
    if (!this.sessionService.isLoggedIn()) {
      return Err(new Error('Unauthorized'));
    }
    try {
      result = Ok(await this.articleService.create(data));
    } catch {
      // const innerError = ensureError(error);
      result = Err(new Error('ArticleCreate'));
    }
    return result;
  }
}
