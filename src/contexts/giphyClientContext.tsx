import React, {
    createContext, useContext, useEffect, useState,
} from 'react';
import giphyApi, { Giphy } from 'giphy-api';
import * as config from '../config/default';

export interface GiphyClientContextState {
    giphyApiClient?: Giphy
    isLoading: boolean
    error?: Error
}

export interface GiphyClientContextProviderProps {
    children?: JSX.Element
}

const GiphyClientContext = createContext<GiphyClientContextState | null>(null);

export const useGiphyClient = (): GiphyClientContextState => {
    const contextState = useContext(GiphyClientContext);

    if (contextState === null) {
        throw new Error('GiphyClient does not have provider');
    }

    return contextState;
};

export const GiphyClientContextProvider = (props: GiphyClientContextProviderProps): JSX.Element => {
    const [state, setState] = useState<GiphyClientContextState>({ isLoading: true });
    const { children } = props;

    useEffect(() => {
        (async (): Promise<void> => {
            try {
                const giphyApiClient = await giphyApi({ apiKey: config.giphy.apiKey });
                setState({ giphyApiClient, isLoading: false });
            } catch (error) {
                setState({ error, isLoading: false });
            }
        })();
    });

    return (
        <GiphyClientContext.Provider value={state}>
            {children}
        </GiphyClientContext.Provider>
    );
};
