import { Article } from '@libs/application/article';
import { Location } from 'history';
import React from 'react';
import { match, NavLink } from 'react-router-dom';

import { ArticlePreview } from '../article/Article';
import { PopularTags } from './PopularTags';

type HomeViewProps = {
    articles?: Article[];
    feed: 'global' | 'mine';
};

export function HomeView(props: HomeViewProps): JSX.Element {
    const { articles, feed } = props;
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
                                    <NavLink
                                        isActive={() => feed === 'mine'}
                                        to={updateSearchParameter('mine')}
                                        activeClassName="active"
                                        className={`nav-link ${
                                            feed === 'mine' ? 'pointer-events-none' : ''
                                        }`}
                                        exact
                                    >
                                        Your Feed
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        isActive={() => feed === 'global'}
                                        to={updateSearchParameter('global')}
                                        activeClassName="active"
                                        className="nav-link"
                                        exact
                                    >
                                        Global Feed
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        {articles ? (
                            articles.map(article => (
                                <ArticlePreview key={article.slug} article={article} />
                            ))
                        ) : (
                            <p className="text-center">Loading...</p>
                        )}

                        {/*todo: pagination*/}
                        <ul className="pagination">
                            <li className="page-item ng-scope active">
                                <a className="page-link ng-binding" href="">
                                    1
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <PopularTags />
                    </div>
                </div>
            </div>
        </div>
    );
}

function updateSearchParameter(name: string) {
    return function (location: Location) {
        const search = new URLSearchParams(location.search);
        search.set('feed', name);
        return '?' + search.toString();
    };
}
