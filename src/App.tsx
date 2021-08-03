import React from 'react';
import { GiphyViewer } from './components/giphyViewer';
import { GiphyClientContextProvider } from './contexts/giphyClientContext';

const App = (): JSX.Element => (
    <>
        <GiphyClientContextProvider>
            <GiphyViewer />
        </GiphyClientContextProvider>
    </>
);

export default App;
