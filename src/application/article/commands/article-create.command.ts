import { Err, Ok, Result } from '@hqoss/monads';
import Error from 'rerror';
import ensureError from 'ensure-error';

import { Interface } from '../..';
import { Article, ArticleCreateInput } from '..';

export class ArticleCreateCommand {
    constructor(
        private readonly articleService: Interface.ArticleService,
        private readonly authenticationService: Interface.AuthenticationService,
    ) {}

    async execute(data: ArticleCreateInput): Promise<Result<Article, Error>> {
        let result: Result<Article, Error>;
        if (!this.authenticationService.isLoggedIn()) {
            return Err(new Error('Unauthorized'));
        }
        try {
            result = Ok(await this.articleService.create(data));
        } catch (error) {
            const innerError = ensureError(error);
            result = Err(new Error(innerError));
        }
        return result;
    }
}
