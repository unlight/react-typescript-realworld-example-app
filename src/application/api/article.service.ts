import { SessionServiceInterface, Tokens } from '@application';
import {
  ArticleCreateInput,
  ArticleEnvelope,
  ArticleFindManyArgs,
  ArticleList,
  ArticleServiceInterface,
  SingleArticle,
} from '@application/article';
import { Tag, TagService } from '@application/tag';
import ky from 'ky';
import { inject } from 'njct';
import { Err, Ok, Result } from 'rsts';

import { AppConfig } from './types';

export class ArticleService implements ArticleServiceInterface, TagService {
  private authorization = () => {
    const token = this.session.getToken();
    return {
      headers: {
        Authorization: token ? `Token ${token}` : undefined,
      },
    };
  };

  constructor(
    private readonly session = inject<SessionServiceInterface>(Tokens.SessionService),
    private readonly http = inject('httpclient', () => ky),
    private readonly config: AppConfig = inject('config'),
  ) {}

  async create(article: ArticleCreateInput): Promise<Result<SingleArticle, Error>> {
    if (!this.session.isLoggedIn()) {
      return Err(new Error('Unauthorized'));
    }

    // todo: Move to DataService or ArticleRepository
    const url = `${this.config.apiBase}/articles`;
    // eslint-disable-next-line sonarjs/prefer-immediate-return
    const result = await this.http
      .extend(this.authorization())
      .post(url, { json: { article } })
      .json<ArticleEnvelope<SingleArticle>>()
      .then(data => Ok(data.article))
      .catch(cause => Err(new Error('ArticleCreate', { cause })));

    return result;
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
