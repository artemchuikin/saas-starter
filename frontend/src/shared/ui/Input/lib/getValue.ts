import {InputProps} from '../../Input';

export const getValue = (value: InputProps['value']) => {
    if (value === undefined || value === null) {
        return '';
    }

    return value;
};
