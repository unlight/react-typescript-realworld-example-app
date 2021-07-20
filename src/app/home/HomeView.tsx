import { Article } from '@libs/application/article';
import { Tag } from '@libs/application/tag';
import { PopularTags } from '@libs/ui';
import React from 'react';

import { ArticlePreview } from '../article/Article';

type HomeViewProps = {
    articles?: Article[];
    tags?: Tag[];
};

export function HomeView(props: HomeViewProps): JSX.Element {
    const { articles, tags } = props;
    return (
        <div className="home-page">
            {/*<div className="banner">
                <div className="container">
                    <h1 className="logo-font">conduit</h1>
                    <p>A place to share your knowledge.</p>
                </div>
            </div>*/}
            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <div className="feed-toggle">
                            <ul className="nav nav-pills outline-active">
                                <li className="nav-item">
                                    <a className="nav-link disabled" href="">
                                        Your Feed
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" href="">
                                        Global Feed
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {articles?.map(article => (
                            <ArticlePreview key={article.slug} article={article} />
                        ))}
                    </div>
                    {/*todo: pagination*/}
                    <div className="col-md-3">
                        <PopularTags tags={tags} />
                    </div>
                </div>
            </div>
        </div>
    );
}
