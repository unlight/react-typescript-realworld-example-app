import { ArticleCreateInput } from '@libs/application/article';
import React from 'react';
import { FieldError } from 'react-hook-form';

type CreateArticleProps = {
    errors: {
        [K in keyof ArticleCreateInput]?: FieldError;
    };
    onSubmit: React.FormEventHandler;
    register: (k: keyof ArticleCreateInput) => any;
    serverErrorMessage: string;
    disabled: boolean;
};

export function CreateArticleView(props: CreateArticleProps): JSX.Element {
    const { disabled, errors, onSubmit, register, serverErrorMessage } = props;
    return (
        <div className="editor-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-10 offset-md-1 col-xs-12">
                        <form onSubmit={onSubmit}>
                            <fieldset className="form-group">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Article Title"
                                    {...register('title')}
                                />
                                {errors.title?.message && (
                                    <ul className="error-messages">
                                        <li>{errors.title.message}</li>
                                    </ul>
                                )}
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="What's this article about?"
                                    {...register('description')}
                                />
                                {errors.description?.message && (
                                    <ul className="error-messages">
                                        <li>{errors.description.message}</li>
                                    </ul>
                                )}
                            </fieldset>
                            <fieldset className="form-group">
                                <textarea
                                    className="form-control"
                                    rows={8}
                                    placeholder="Write your article (in markdown)"
                                    {...register('body')}
                                ></textarea>
                                {errors.body?.message && (
                                    <ul className="error-messages">
                                        <li>{errors.body.message}</li>
                                    </ul>
                                )}
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter tags"
                                    {...register('tagList')}
                                />
                                <div className="tag-list"></div>
                                {errors.tagList?.types && (
                                    <ul className="error-messages">
                                        {Object.entries(errors.tagList.types).map(
                                            ([type, message]) => (
                                                <li key={type}>{message}</li>
                                            ),
                                        )}
                                    </ul>
                                )}
                            </fieldset>
                            {serverErrorMessage && (
                                <p className="error-messages">{serverErrorMessage}</p>
                            )}
                            <button
                                className="btn btn-lg pull-xs-right btn-primary"
                                disabled={disabled}
                            >
                                Publish Article
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
