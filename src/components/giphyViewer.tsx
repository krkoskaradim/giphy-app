import React from 'react';
import { Spin } from 'antd';
import { useGiphyClient } from '../contexts/giphyClientContext';
import { GiphyList } from './giphyList';

export const GiphyViewer = (): JSX.Element => {
    const { isLoading, error } = useGiphyClient();
    console.log('test');
    if (isLoading) {
        return (
            <Spin spinning />
        );
    }

    return (
        <GiphyList />
    );
};
