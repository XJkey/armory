import React, { useState, ChangeEvent, ReactElement, useEffect, useRef } from 'react';
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce'
import classNames from 'classnames';
import useClickOutside from '../../hooks/useClickOutside';
interface DataSourceObject {
    value: string
}

//相当于{}&{value: string}
export type DataSourceType<T = {}> = T & DataSourceObject


export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (keyword: string) => DataSourceType[] | Promise<DataSourceType[]>,

    onSelect?: (item: DataSourceType) => void,

    renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
    const { fetchSuggestions, onSelect, value, renderOption, ...restProps } = props;
    const [inputValue, SetInputValue] = useState(value as string)
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
    const [loading, setLoading] = useState(false);
    //useRef:跨越渲染周期存储数据，而且对它修改也不会引起组件渲染
    const triggerSearch = useRef(false);
    const componentRef = useRef<HTMLDivElement>(null);

    const [hightlightIndex, setHightlightIndex] = useState(-1)
    const debounceValue = useDebounce(inputValue, 500);
    useClickOutside(componentRef, () => { setSuggestions([]) })
    useEffect(() => {
        if (debounceValue && triggerSearch.current) {
            const results = fetchSuggestions(debounceValue)
            if (results instanceof Promise) {
                setLoading(true)
                results.then(data => {
                    setLoading(false)
                    setSuggestions(data)
                })
            } else {
                setSuggestions(results)
            }

        } else {
            setSuggestions([])
        }
        setHightlightIndex(-1)
    }, [debounceValue, fetchSuggestions])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        SetInputValue(value)
        triggerSearch.current = true
    }

    const handleSelect = (item: DataSourceType) => {
        SetInputValue(item.value)
        setSuggestions([])
        if (onSelect) {
            onSelect(item)
        }
        triggerSearch.current = false
    }

    const hightligth = (index: number) => {
        if (index < 0) index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHightlightIndex(index)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            case 13:
                if (suggestions[hightlightIndex]) {
                    handleSelect(suggestions[hightlightIndex])
                }
                break;
            case 38:
                hightligth(hightlightIndex - 1)
                break;
            case 40:
                hightligth(hightlightIndex + 1)
                break;
            case 27:
                setSuggestions([])
                break
            default:
                break
        }
    }

    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }
    const generateDropdown = () => {
        return (
            <ul>
                {suggestions.map((item, index) => {
                    const cnames = classNames('suggestion-item', {
                        'item-heigtlighted': index === hightlightIndex
                    })
                    return (
                        <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                            {renderTemplate(item)}
                        </li>
                    )
                })}
            </ul>
        )
    }
    return (
        <div className="viking-auto-complete" ref={componentRef}>
            <Input value={inputValue} {...restProps} onChange={handleChange} onKeyDown={handleKeyDown} />
            {loading && <ul><Icon icon='spinner' spin /></ul>}
            {(suggestions.length > 0) && generateDropdown()}
        </div>
    )
}
