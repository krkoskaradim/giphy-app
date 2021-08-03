import React, { useEffect, useState } from 'react';
import { message, Spin } from 'antd';
import { useGiphyClient } from '../contexts/giphyClientContext';
import { GiphyList } from './giphyList';
import { GiphyKeywordInput } from './giphyKeywordInput';

export const GiphyViewer = (): JSX.Element => {
    const { isLoading, error } = useGiphyClient();
    const [keyword, setKeyword] = useState<string>('');

    useEffect(() => {
        if (error) {
            (async () => {
                await message.error(error?.message);
            })();
        }
    }, [error]);

    if (isLoading) {
        return (
            <Spin spinning />
        );
    }

    return (
        <>
            <GiphyKeywordInput setValue={setKeyword} initialValue={keyword} />
            <GiphyList keyword={keyword} />
        </>
    );
};
