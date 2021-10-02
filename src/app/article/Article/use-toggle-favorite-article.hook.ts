import { ArticleService } from '@libs/application/interfaces';
import { inject } from 'njct';
import { useCallback, useState } from 'react';
import { resourceCache, useAsyncResource } from 'use-async-resource';

async function togglefavoriteArticle(slug: string, favorited: boolean) {
  const articleService = inject<ArticleService>('articleservice');
  return favorited ? articleService.unfavorite(slug) : articleService.favorite(slug);
}

export function useTogglefavoriteArticle(slug: string, favorited: boolean) {
  const [isFavorited, setIsFavorited] = useState(favorited);
  const [articleReader, toggleFavorite] = useAsyncResource(togglefavoriteArticle);
  const toggleCallback = useCallback(() => {
    resourceCache(togglefavoriteArticle).clear();
    toggleFavorite(slug, isFavorited);
    setIsFavorited(!isFavorited);
  }, [slug, isFavorited, toggleFavorite]);

  return { articleReader, toggleCallback };
}
