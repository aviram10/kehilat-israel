import { useEffect, useState } from 'react';
export const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return {
        value,
        onChange: handleChange
    };
};