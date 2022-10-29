import { Tokens } from '@application';
import { ArticleServiceInterface } from '@application/article';
import { useRequest } from 'ahooks';
import { inject } from 'njct';

export function useHome() {
  const { data: articleList } = useRequest(async () => {
    const articleService = inject<ArticleServiceInterface>(
      Tokens.ArticleService,
    );
    const result = await articleService.findMany();
    return result.unwrap();
  });

  return { articleList };
}
