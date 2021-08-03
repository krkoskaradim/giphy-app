import React, { useEffect, useState } from 'react';
import { Col, Row, Spin } from 'antd';
import { MultiResponse } from 'giphy-api';
import { useGiphyClient } from '../contexts/giphyClientContext';
import { GiphyItem } from './giphyItem';

export const GiphyList = (): JSX.Element => {
    const { giphyApiClient, error, isLoading } = useGiphyClient();
    const [data, setData] = useState<MultiResponse>();

    useEffect(() => {
        if (!isLoading) {
            (async (): Promise<void> => {
                const giphyResponse = await giphyApiClient?.search('test');
                setData(giphyResponse);
            })();
        }
    }, [isLoading]);

    if (isLoading) {
        return (
            <Spin spinning size="large" />
        );
    }

    return (
        <>
            <Row gutter={16}>
                {data?.data.map((gifData) => (
                    <Col span={8} key={gifData.id}>
                        <GiphyItem gifData={gifData} />
                    </Col>
                ))}
            </Row>
        </>
    );
};
