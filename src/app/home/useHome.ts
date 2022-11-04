import { Tokens } from '@application';
import { ArticleServiceInterface } from '@application/article';
import { useRequest } from 'ahooks';
import { inject } from 'njct';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useHome() {
  const [searchParams] = useSearchParams();
  const { data, run } = useRequest(
    async () => {
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
    },
    { manual: true },
  );

  useEffect(() => {
    run();
  }, [run, searchParams]);

  return { articleList: data };
}
