import React, { useEffect, useState } from 'react';
import { message, Spin } from 'antd';
import { useGiphyClient } from '../contexts/giphyClientContext';
import { GiphyList } from './giphyList';
import { GiphyKeywordInput } from './giphyKeywordInput';
import { GiphyRatingFilter, Rating } from './giphyRatingFilter';

export const GiphyViewer = (): JSX.Element => {
    const { isLoading, error } = useGiphyClient();
    const [keyword, setKeyword] = useState<string>('');
    const [rating, setRating] = useState<Rating>('g');

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
            <GiphyRatingFilter setValue={setRating} initialValue={rating} />
            <GiphyList rating={rating} keyword={keyword} />
        </>
    );
};
