import React from 'react';
import { GiphyClientContextProvider } from '../contexts/giphyClientContext';
import { GiphyList } from './giphyList';

export const GiphyViewer = (): JSX.Element => (
    <GiphyClientContextProvider>
        <GiphyList />
    </GiphyClientContextProvider>
);
