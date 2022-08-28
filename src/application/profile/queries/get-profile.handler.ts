import { inject } from 'njct';
import { Err, Ok, Result } from 'rsts';

import { ArticleList, ArticleServiceInterface } from '../../article';
import { UserService } from '../../user';
import { Profile } from '../interfaces';

export class GetProfileHandler {
  constructor(
    private readonly userService = inject<UserService>('userservice'),
    private readonly articleService = inject<ArticleServiceInterface>('articleservice'),
  ) {}

  async execute(username: string) {
    let result: Result<{ profile: Profile; articleList: ArticleList }, Error>;
    try {
      const [profile, articleList] = await Promise.all([
        this.userService.getProfile(username),
        this.articleService.findMany({ author: username }),
      ]);
      result = Ok({ profile, articleList });
    } catch (error: any) {
      result = Err(error);
    }
    return result;
  }
}
