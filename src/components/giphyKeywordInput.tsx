import React, {
    ChangeEvent, Dispatch, SetStateAction, useState,
} from 'react';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export interface GiphyKeywordInputProps {
    setValue: Dispatch<SetStateAction<string>>
    initialValue: string
}

export const GiphyKeywordInput = (props: GiphyKeywordInputProps): JSX.Element => {
    const { setValue, initialValue } = props;
    const [inputValue, setInputValue] = useState<string>(initialValue);
    const onChange = (e: ChangeEvent<HTMLInputElement>): void => { setInputValue(e.target.value); };
    const onClick = (): void => { setValue(inputValue); };

    return (
        <Input onChange={onChange} addonAfter={(<SearchOutlined onClick={onClick} />)} />
    );
};
