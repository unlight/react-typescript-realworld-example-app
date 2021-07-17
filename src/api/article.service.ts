import type { AppConfig, Interface } from '@libs/application';
import type {
    Article,
    ArticleCreatedEvent,
    ArticleCreateInput,
    ArticleEnvelope,
} from '@libs/application/article';
import type { FindManyArgs } from '@libs/application/types';
import ky from 'ky';
import { inject } from 'njct';

export class ArticleService implements Interface.ArticleService {
    constructor(
        private readonly authenticationService: Interface.AuthenticationService = inject(
            'authenticationservice',
        ),
        private readonly http = inject('httpclient', () => ky),
        private readonly config: AppConfig = inject('config'),
    ) {}

    async create(article: ArticleCreateInput): Promise<ArticleCreatedEvent> {
        const url = `${this.config.apiBase}/articles`;
        const articleEnvelope = await this.http
            .extend({
                headers: {
                    Authorization: `Token ${this.authenticationService.getToken()}`,
                },
            })
            .post(url, { json: { article } })
            .json<ArticleEnvelope<Article>>();
        return articleEnvelope.article;
    }

    update(data: any): Promise<Article> {
        throw new Error('Method not implemented.');
    }

    delete(data: any): Promise<void> {
        throw new Error('Method not implemented.');
    }

    findMany(findManyArgs: FindManyArgs): Promise<Article[]> {
        throw new Error('Method not implemented.');
    }

    favorite(articleId: string): Promise<true> {
        throw new Error('Method not implemented.');
    }

    unfavorite(articleId: string): Promise<true> {
        throw new Error('Method not implemented.');
    }

    async findOne(slug: string): Promise<Article> {
        return await this.http
            .get(`${this.config.apiBase}/article/${slug}`)
            .json<Article>();
    }
}
