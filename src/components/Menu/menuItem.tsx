import React, { useContext } from "react";
import ClassNames from "classnames";
import { MenuContext } from './menu'
export interface MenuItemProps {
    index?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const { index, disabled, className, style, children } = props;
    const context = useContext(MenuContext);
    const classes = ClassNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    })

    const handleClick = () => {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index);
        }
    }

    if (children) {
        return (
            <li className={classes} style={style} onClick={handleClick}>
                {children}
            </li>
        )
    } else {
        return <></>
    }
}
//判断类型
MenuItem.displayName = 'MenuItem'
export default MenuItem
