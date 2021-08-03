import React, { useState } from 'react';
import { Spin } from 'antd';
import { useGiphyClient } from '../contexts/giphyClientContext';
import { GiphyList } from './giphyList';
import { GiphyKeywordInput } from './giphyKeywordInput';

export const GiphyViewer = (): JSX.Element => {
    const { isLoading, error } = useGiphyClient();
    const [keyword, setKeyword] = useState<string>('');
    if (isLoading) {
        return (
            <Spin spinning />
        );
    }

    return (
        <>
            <GiphyKeywordInput setValue={setKeyword} />
            <GiphyList keyword={keyword} />
        </>
    );
};
