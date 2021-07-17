export interface Article {
    slug: string;
    title: string;
    description: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    tagList: string[];
    author: {
        username: string;
        bio: string;
        image: string;
        following: boolean;
    };
    favorited: boolean;
    favoritesCount: boolean;
}
