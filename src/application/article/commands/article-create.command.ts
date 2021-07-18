import { Err, Ok, Result } from '@hqoss/monads';
import ensureError from 'ensure-error';
import Exception from 'rerror';

import { Interface } from '../..';
import { Article, ArticleCreateInput } from '..';

export class ArticleCreateCommand {
    constructor(
        private readonly articleService: Interface.ArticleService,
        private readonly authenticationService: Interface.AuthenticationService,
    ) {}

    async execute(data: ArticleCreateInput): Promise<Result<Article, Exception>> {
        let result: Result<Article, Exception>;
        if (!this.authenticationService.isLoggedIn()) {
            return Err(
                new Exception({
                    name: 'Unauthorized',
                }),
            );
        }
        try {
            result = Ok(await this.articleService.create(data));
        } catch (error) {
            const innerError = ensureError(error);
            result = Err(
                new Exception({
                    name: 'ArticleCreate',
                    cause: innerError,
                }),
            );
        }
        return result;
    }
}
