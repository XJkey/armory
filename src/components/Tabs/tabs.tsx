import React, { useState, createContext } from "react";
import ClassNames from "classnames";
import { tabsItemProps } from "./tabsItem";
import { deflate } from "zlib";
type SelectCallback = (selectedIndex: number) => void;
export interface tabsProps {
    defalutIndex?: number;
    className?: string;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
}



interface ITabsContext {
    index: number,
    onSelect?: SelectCallback
}

export const TabsContext = createContext<ITabsContext>({ index: 0 })

const Tabs: React.FC<tabsProps> = (props) => {
    const { className, defalutIndex, style, onSelect, children } = props;
    const [currentActive, setActive] = useState(defalutIndex);
    const tabsClasses = ClassNames('tabs', className)


    const handleClik = (index: number) => {
        setActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }

    const passedContext: ITabsContext = {
        index: currentActive || 0,
        onSelect: handleClik
    }

    const TabChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<tabsItemProps>;
            const { displayName } = childElement.type;
            if (displayName === 'TabsItem') {
                const tabsItemClasses = ClassNames('tabs-item', { 'is-active': passedContext.index === index, 'is-disabled': childElement.props.disabled });
                return React.cloneElement(<li className={tabsItemClasses} onClick={() => { handleClik(index) }}></li>, { index }, childElement.props.title)
            } else {
                console.log('waring:Tab的子元素必须是TabItem')
            }
        })
    }

    const ContentChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<tabsItemProps>;
            const { displayName } = childElement.type;
            if (displayName === 'TabsItem') {
                return React.cloneElement(childElement, { index })
            } else {
                console.log('waring:Tab的子元素必须是TabItem')
            }
        })
    }
    return (
        <div className={tabsClasses}>
            <ul style={style}>
                {TabChildren()}
            </ul>
            <div>
                <TabsContext.Provider value={passedContext}>
                    {ContentChildren()}
                </TabsContext.Provider>
            </div>
        </div>

    )
}

export default Tabs;