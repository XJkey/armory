import React, { useState, useEffect } from "react";

const useDebounceHook = (value: string, delay = 300) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        let timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay)
        return () => clearTimeout(timer)
    }, [value,delay]);
    return debouncedValue
}

export default useDebounceHook