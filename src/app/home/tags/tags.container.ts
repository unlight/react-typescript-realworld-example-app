import { createContainer } from 'unstated-next';
import { useState, useEffect, useCallback } from 'react';

function useTags(options?: { url: string }) {
    // todo: use-http here
    let [tags, setTags] = useState([] as string[]);

    useEffect(() => {
        async function getTags() {
            const tags = await fetch(options!.url).then((r) => r.json());
            setTags(tags);
        }
        getTags();
    }, []);

    return tags;
}

export const TagsContainer = createContainer(useTags);
