import React, { useEffect, useState } from 'react';
import {
    Col, Result, Row, Spin,
} from 'antd';
import { GIFObject, MultiResponse } from 'giphy-api';
import InfiniteScroll from 'react-infinite-scroller';
import { useGiphyClient } from '../contexts/giphyClientContext';
import { GiphyItem } from './giphyItem';
import * as config from '../config/default';
import { Rating } from './giphyRatingFilter';

export interface GiphyListProps {
    keyword: string
    rating: Rating
}

export const GiphyList = (props: GiphyListProps): JSX.Element => {
    const { keyword, rating } = props;
    const { giphyApiClient } = useGiphyClient();

    const [response, setResponse] = useState<MultiResponse>();
    const [gifsData, setGifsData] = useState<GIFObject[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setGifsData([]);
        setOffset(0);
        setIsLoading(true);
    }, [keyword, rating]);

    useEffect(() => {
        (async (): Promise<void> => {
            if (isLoading) {
                const giphyResponse = await giphyApiClient?.search({
                    q: keyword,
                    limit: config.giphy.list.itemsPerPage,
                    offset,
                    rating,
                });
                setResponse(giphyResponse);
                setGifsData(gifsData.concat(giphyResponse?.data || []));
                setIsLoading(false);
            }
        })();
    }, [isLoading]);

    if (!response && isLoading) {
        return (
            <Spin spinning />
        );
    }

    if (!response) {
        return (
            <Result status="404" />
        );
    }

    const { pagination } = response;

    return (
        <>
            <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                hasMore={((pagination.offset + pagination.count) < pagination.total_count) && !isLoading}
                loadMore={() => { setOffset(offset + config.giphy.list.itemsPerPage); setIsLoading(true); }}
                loader={(<Spin key="giphyListLoader" size="large" spinning />)}
            >
                <Row gutter={16}>
                    {gifsData.map((gifData) => (
                        <Col span={8} key={gifData.id}>
                            <GiphyItem gifData={gifData} />
                        </Col>
                    ))}
                </Row>
            </InfiniteScroll>
        </>
    );
};
