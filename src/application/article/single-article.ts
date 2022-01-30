export interface SingleArticle {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
  favorited: boolean;
  favoritesCount: number;
}
