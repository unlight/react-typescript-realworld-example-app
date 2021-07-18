import { Article } from '@libs/application/article';
import React from 'react';

type ArticlePreviewProps = {
    article: Article;
};

export function ArticlePreview(props: ArticlePreviewProps): JSX.Element {
    const { author, description, title, slug, createdAt, favoritesCount } =
        props.article;
    return (
        <div className="article-preview">
            <div className="article-meta">
                <a href="profile.html">
                    <img src={author.image} />
                </a>
                <div className="info">
                    <a href="" className="author">
                        {author.username}
                    </a>
                    <span className="date">{createdAt}</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart"></i> {favoritesCount}
                </button>
            </div>

            <a href={`/article/${slug}`} className="preview-link">
                <h1>{title}</h1>
                <p>{description}</p>
                <span>Read more...</span>
            </a>
        </div>
    );
}
