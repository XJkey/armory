import React, { useContext } from "react";
import ClassNames from "classnames";
import { TabsContext } from "./tabs"

export interface tabsItemProps {
    index: number;
    className?: string;
    style?: React.CSSProperties;
    title: string,
    disabled?: boolean;
}

const TabsItem: React.FC<tabsItemProps> = (props) => {
    const { className, style, children, index } = props;
    const context = useContext(TabsContext);
    const classes = ClassNames('tabsContent', className, {
        'tabs-opened': context.index === index
    })
    return (
        <div style={style} className={classes}>{children}</div>
    )
}

TabsItem.displayName = 'TabsItem'

export default TabsItem;