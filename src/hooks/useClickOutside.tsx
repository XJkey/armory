import { RefObject, useEffect } from "react";

const useClickOutsideHook = (ref: RefObject<HTMLElement>, callBack: Function) => {
    useEffect(() => {
        const listener = (e: MouseEvent) => {
            if (!e.target || ref.current?.contains(e.target as Node)) return;
            callBack(e)
        }
        document.addEventListener('click', listener)
        return () => document.removeEventListener("click", listener)
    }, [ref, callBack])
}

export default useClickOutsideHook