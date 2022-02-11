import { useEffect, useState } from 'react';

const PREFIX = 'ChatApp-';

export default function useLocalStorage(key, initalValue) {
    const prefixKey = PREFIX + key;
    const [value,setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixKey);
        if(jsonValue != null) return JSON.parse(jsonValue);
        if(typeof initalValue === 'function') {
            return initalValue();
        } else {
            return initalValue;
        }
    })

    useEffect(() =>{
        localStorage.setItem(prefixKey, JSON.stringify(value));
    }, [prefixKey, value])

    return [value, setValue]
}