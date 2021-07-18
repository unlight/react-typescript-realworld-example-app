import type { AppConfig, Interface } from '@libs/application';
import {
    Article,
    ArticleCreateInput,
    ArticleEnvelope,
    ArticleFindManyArgs,
    ArticleList,
} from '@libs/application/article';
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

    async create(article: ArticleCreateInput): Promise<Article> {
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

    async findOne(slug: string): Promise<Article> {
        const envelope = await this.http
            .get(`${this.config.apiBase}/articles/${slug}`)
            .json<ArticleEnvelope<Article>>();
        return envelope.article;
    }

    update(data: any): Promise<Article> {
        throw new Error('Method not implemented.');
    }

    delete(data: any): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async findMany(args: ArticleFindManyArgs = {}): Promise<ArticleList> {
        return await this.http
            .extend({
                headers: {
                    Authorization: `Token ${this.authenticationService.getToken()}`,
                },
            })
            .get(`${this.config.apiBase}/articles`, {
                searchParams: {
                    limit: args.take ?? 5,
                    skip: args.skip ?? 0,
                },
            })
            .json<ArticleList>();
    }

    favorite(articleId: string): Promise<true> {
        throw new Error('Method not implemented.');
    }

    unfavorite(articleId: string): Promise<true> {
        throw new Error('Method not implemented.');
    }
}
