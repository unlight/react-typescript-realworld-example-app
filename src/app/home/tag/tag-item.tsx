import React from 'react';

type Props = {
    name: string;
};

export function TagItem({ name }: Props) {
    return (
        <a href="/tag" className="tag-pill tag-default">
            {name}
        </a>
    );
}
