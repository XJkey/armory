import { ReactElement, useState, useEffect, KeyboardEvent, useRef } from "react";
import React, { ChangeEvent } from "react";
import classNames from "classnames";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import useDebounceHook from "../../hooks/useDebounce"
import useClickOutside from "../../hooks/useClickOutside"
import Transition from "../Transition/transition"
interface DataSourceObject {
    value: string
    [index: string | number | symbol]: any
}

export type DataSourceType<T = {}> = T & DataSourceObject

interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
    fetchSuggestions: (item: string) => DataSourceType[] | Promise<DataSourceType[]>
    onSelect?: (item: DataSourceType) => void
    renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
    const { fetchSuggestions, onSelect, value, renderOption, ...restPsops } = props
    const [inputValue, setInputValue] = useState(value as string || "")
    const [suggestions, setSugestions] = useState<DataSourceType[]>([])
    const [loading, setLoading] = useState(false)
    const [highlightIndex, setHighlightIndex] = useState(-1)
    const debounceValue = useDebounceHook(inputValue, 800)
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)
    useClickOutside(componentRef, () => setSugestions([]))
    useEffect(() => {
        if (debounceValue && triggerSearch.current) {
            let results = fetchSuggestions(debounceValue);
            if (results instanceof Promise) {
                setLoading(true)
                results.then((data) => {
                    setLoading(false)
                    setSugestions(data)
                })
            } else {
                setSugestions(results)
            }
        } else {
            setSugestions([])
        }
        setHighlightIndex(-1)
    }, [debounceValue])
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.trim();
        triggerSearch.current = true;
        setInputValue(value);
    }
    const handleSelect = (item: DataSourceType) => {
        if (!item) return;
        setInputValue(item.value)
        setSugestions([])
        if (onSelect) {
            onSelect(item)
        }
        triggerSearch.current = false;
    }
    const highlight = (index: number) => {
        console.log(index)
        if (index < 0) index = 0;
        if (index >= suggestions.length) index = suggestions.length - 1;
        setHighlightIndex(index)
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {

        switch (e.keyCode) {
            case 13:
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex])
                }
                break
            case 38:
                highlight(highlightIndex - 1)
                break
            case 40:
                highlight(highlightIndex + 1)
                break
            case 27:
                setSugestions([])
                break
            default:
                break
        }
    }

    const renderTemplate = (item: DataSourceType) => {
        if (renderOption) {
            return renderOption(item)
        } else {
            return item.value
        }
    }
    const generateDropdown = () => {
        return (
            <Transition in={(suggestions.length > 0 && !!inputValue) || loading} timeout={500} animation="zoom-in-top" onExited={() => { setSugestions([]); console.log("onExited") }}>
                <ul className="viking-suggestion-list">
                    {loading && <li><Icon icon="spinner" spin /></li>}
                    {suggestions.map((item, index) => {
                        const cnames = classNames('suggestion-item', {
                            'is-active': index === highlightIndex
                        })
                        return <li className={cnames} key={index} onClick={() => handleSelect(item)}>{renderTemplate(item)}</li>
                    })}
                </ul>
            </Transition>
        )
    }

    return (
        <div className="viking-auto-complete" ref={componentRef}>
            <Input {...restPsops} value={inputValue} onChange={(e) => handleChange(e)} onKeyDown={handleKeyDown} />
            {generateDropdown()}
        </div>
    )

}

export default AutoComplete;