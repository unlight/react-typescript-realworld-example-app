import { Err, Ok, Result } from '@hqoss/monads';
import { inject } from 'njct';

import { ArticleList } from '../../article';
import { ArticleService, UserService } from '../../interfaces';
import { Profile } from '../interfaces';

export class GetProfileHandler {
  constructor(
    private readonly userService = inject<UserService>('userservice'),
    private readonly articleService = inject<ArticleService>('articleservice'),
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
