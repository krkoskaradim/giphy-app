import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { Input } from 'antd';

export interface GiphyKeywordInputProps {
    setValue: Dispatch<SetStateAction<string>>
}

export const GiphyKeywordInput = (props: GiphyKeywordInputProps): JSX.Element => {
    const { setValue } = props;
    const onChange = (e: ChangeEvent<HTMLInputElement>): void => { setValue(e.target.value); };

    return (
        <Input onChange={onChange} />
    );
};
