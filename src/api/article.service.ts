import type { Interface } from '@libs/application';
import {
  Article,
  ArticleCreateInput,
  ArticleEnvelope,
  ArticleFindManyArgs,
  ArticleList,
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

  async create(article: ArticleCreateInput): Promise<Article> {
    const url = `${this.config.apiBase}/articles`;
    const articleEnvelope = await this.http
      .extend(this.authorization())
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

  favorite(articleId: string): Promise<true> {
    throw new Error('Method not implemented.');
  }

  unfavorite(articleId: string): Promise<true> {
    throw new Error('Method not implemented.');
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
