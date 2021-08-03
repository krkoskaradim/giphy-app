import React from 'react';
import { Card } from 'antd';
import { GIFObject } from 'giphy-api';

export interface GiphyItemProps {
    gifData: GIFObject;
}

export const GiphyItem = (props: GiphyItemProps): JSX.Element => {
    const { gifData } = props;
    return (
        <Card
            cover={<img src={gifData.images.original.url} alt={gifData.title} />}
        >
            {gifData.title}
        </Card>
    );
};
