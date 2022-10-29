import { Tokens } from '@application';
import { ArticleServiceInterface } from '@application/article';
import { useRequest } from 'ahooks';
import { inject } from 'njct';
import { useSearchParams } from 'react-router-dom';

export function useHome() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: articleList } = useRequest(async () => {
    const page = Number(searchParams.get('page') || 1);
    const take = 5;
    const skip = take * (page - 1);
    const articleService = inject<ArticleServiceInterface>(
      Tokens.ArticleService,
    );
    const result = await articleService.findMany({
      skip,
      take,
    });
    return result.unwrap();
  });

  return { articleList };
}
