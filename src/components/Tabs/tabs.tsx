import React, { useState, createContext } from "react";
import ClassNames from "classnames";
import { tabsItemProps } from "./tabsItem";
import TabsMenu from "./tabsMenu";


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
                return React.cloneElement(<TabsMenu index={index} disabled={childElement.props.disabled}>{childElement.props.title}</TabsMenu>)
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
            <ul style={style} className='tabs-menu'>
                <TabsContext.Provider value={passedContext}>
                    {TabChildren()}
                </TabsContext.Provider>
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