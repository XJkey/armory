import { RefObject, useEffect } from 'react';

function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
    useEffect(() => {
        const listner = (event: MouseEvent) => {
            //.contains() 判断一个元素内是否包含另一个元素
            if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
                return
            }
            handler(event)
        }
        document.addEventListener('click', listner)
        return () => {
            document.removeEventListener('click', listner)
        }
    }, [ref, handler])
}

export default useClickOutside
