import { ArticleServiceInterface, SingleArticle } from '@application/article';
import { useRequest } from 'ahooks';
import { inject } from 'njct';
import { useCallback, useState } from 'react';

async function togglefavoriteArticle(slug: string, favorited: boolean) {
  const articleService = inject<ArticleServiceInterface>('articleservice');
  return favorited ? articleService.unfavorite(slug) : articleService.favorite(slug);
}

export function useTogglefavoriteArticle(initialArticle: SingleArticle) {
  const [article, setArtcile] = useState(initialArticle);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { run } = useRequest(togglefavoriteArticle, {
    manual: true,
    onBefore: () => {
      setRequestInProgress(true);
    },
    onSuccess: data => {
      setArtcile(data);
    },
    onFinally: () => {
      setRequestInProgress(false);
    },
  });

  const toggleCallback = useCallback(() => {
    const { slug, favorited } = article;
    run(slug, favorited);
  }, [run, article]);

  return { article, toggleCallback, requestInProgress };
}
