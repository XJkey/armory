import React, { useContext } from "react";
import ClassNames from "classnames";
import { TabsContext } from "./tabs"

export interface tabsMenuProps {
    index: number;
    disabled?: boolean;
    children: React.ReactNode
}

const TabsMenu: React.FC<tabsMenuProps> = (props) => {
    const { children, index, disabled } = props;
    const context = useContext(TabsContext);
    const tabsItemClasses = ClassNames('tabs-item', { 'is-active': context.index === index, 'is-disabled': disabled });
    const handleClik = () => {
        if (context.onSelect && !disabled) {
            context.onSelect(index)
        }
    }
    return (
        <li className={tabsItemClasses} onClick={handleClik}>
            {children}
        </li>
    )
}

TabsMenu.displayName = 'TabsMenu'

export default TabsMenu;