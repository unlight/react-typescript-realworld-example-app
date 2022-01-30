import type { Interface } from '@libs/application';
import {
  ArticleCreateInput,
  ArticleEnvelope,
  ArticleFindManyArgs,
  ArticleList,
  SingleArticle,
} from '@libs/application/article';
import { Tag } from '@libs/application/tag';
import ky from 'ky';
import { inject } from 'njct';

import { AppConfig } from './types';

export class ArticleService implements Interface.ArticleService, Interface.TagService {
  private authorization = () => {
    const token = this.sessionService.getToken();
    return {
      headers: {
        Authorization: token ? `Token ${token}` : undefined,
      },
    };
  };

  constructor(
    private readonly sessionService: Interface.SessionService = inject(
      'sessionservice',
    ),
    private readonly http = inject('httpclient', () => ky),
    private readonly config: AppConfig = inject('config'),
  ) {}

  async create(article: ArticleCreateInput): Promise<SingleArticle> {
    const url = `${this.config.apiBase}/articles`;
    const articleEnvelope = await this.http
      .extend(this.authorization())
      .post(url, { json: { article } })
      .json<ArticleEnvelope<SingleArticle>>();
    return articleEnvelope.article;
  }

  async findOne(slug: string): Promise<SingleArticle> {
    const envelope = await this.http
      .get(`${this.config.apiBase}/articles/${slug}`)
      .json<ArticleEnvelope<SingleArticle>>();
    return envelope.article;
  }

  update(data: any): Promise<SingleArticle> {
    throw new Error('Method not implemented.');
  }

  delete(data: any): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findMany(args: ArticleFindManyArgs = {}): Promise<ArticleList> {
    const searchParams = {
      limit: args.take ?? 5,
      skip: args.skip ?? 0,
      ...(args.author && { author: args.author }),
    };
    return await this.http
      .extend(this.authorization())
      .get(`${this.config.apiBase}/articles`, { searchParams })
      .json<ArticleList>();
  }

  async favorite(slug: string): Promise<SingleArticle> {
    return await this.http
      .extend(this.authorization())
      .post(`${this.config.apiBase}/articles/${slug}/favorite`)
      .json<ArticleEnvelope<SingleArticle>>()
      .then(result => result.article);
  }

  async unfavorite(slug: string): Promise<SingleArticle> {
    return await this.http
      .extend(this.authorization())
      .delete(`${this.config.apiBase}/articles/${slug}/favorite`)
      .json<ArticleEnvelope<SingleArticle>>()
      .then(result => result.article);
  }

  async feed(args: ArticleFindManyArgs): Promise<ArticleList> {
    return await this.http
      .extend(this.authorization())
      .get(`${this.config.apiBase}/articles/feed`, {
        searchParams: {
          limit: args.take ?? 5,
          skip: args.skip ?? 0,
        },
      })
      .json<ArticleList>();
  }

  async getAllTags(): Promise<Tag[]> {
    const envelope = await this.http
      .get(`${this.config.apiBase}/tags`)
      .json<{ tags: Tag[] }>();
    return envelope.tags;
  }
}
