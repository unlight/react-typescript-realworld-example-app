import React from 'react';

import { injectReducers } from '../app.state';
import { ArticlePreview } from './article/article-preview';
import { Feed } from './feed/feed';
import { ConnectedTagList, tagReducer } from './tag';

injectReducers({ tag: tagReducer });

export default function HomePage() {
    return (
        <>
            <div className="home-page">
                <div className="banner">
                    <div className="container">
                        <h1 className="logo-font">conduit</h1>
                        <p>A place to share your knowledge.</p>
                    </div>
                </div>

                <div className="container page">
                    <div className="row">
                        <div className="col-md-9">
                            <Feed />
                            {/* Many ArticlePreview */}
                            <ArticlePreview />
                        </div>

                        <div className="col-md-3">
                            <div className="sidebar">
                                <ConnectedTagList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
