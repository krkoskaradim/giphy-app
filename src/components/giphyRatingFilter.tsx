import React, { Dispatch, SetStateAction } from 'react';
import { SearchOptions } from 'giphy-api';
import { Select } from 'antd';

export type Rating = SearchOptions['rating'] // @types/giphy-api does not export Rating type...

export interface GiphyRatingFilterProps {
    setValue: Dispatch<SetStateAction<Rating>>
    initialValue: Rating
}

export const GiphyRatingFilter = (props: GiphyRatingFilterProps): JSX.Element => {
    const { setValue, initialValue } = props;
    const onChange = (value: Rating): void => { setValue(value); };

    // author of the types library used Type instead of enum, so this is best solution, If I want to use giphy-api library
    const options: Rating[] = ['g', 'pg', 'pg-13', 'r', 'y'];

    return (
        <Select
            defaultValue={initialValue}
            onChange={onChange}
        >
            {options.map((option): JSX.Element => (
                <Select.Option key={option} value={option}>{option}</Select.Option>
            ))}
        </Select>
    );
};
