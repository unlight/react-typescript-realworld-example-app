import { Err, Ok, Result } from '@hqoss/monads';
import { inject } from 'njct';

import { Interface } from '../..';
import { Article, ArticleCreateInput } from '..';

export class ArticleCreateCommand {
  constructor(
    private readonly articleService = inject<Interface.ArticleService>(
      'articleservice',
    ),
    private readonly sessionService = inject<Interface.SessionService>(
      'sessionservice',
    ),
  ) {}

  async execute(data: ArticleCreateInput): Promise<Result<Article, Error>> {
    let result: Result<Article, Error>;
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
