import React, { FunctionComponentElement, useContext, useState } from "react";
import ClassNames from "classnames";

import  Transition from '../Transition/transition';
import { MenuContext } from './menu'
import { MenuItemProps } from "./menuItem";
import Icon from '../Icon/icon';

export interface SubMenuProps {
    index?: string,
    title: string,
    className?: string
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, children, className }) => {
    const context = useContext(MenuContext);
    const opendSubmenus = context.defaultOpenSubMenus as Array<string>;
    const isOpend = (index && context.mode === 'vertical') ? opendSubmenus.includes(index) : false;
    const [menuOpen, setOpen] = useState(isOpend)

    const classes = ClassNames('menu-item submenu-item', className, {
        'is-active': context.index.split('-')[0] === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    })

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(!menuOpen);
    }
    let timer: any;
    const handleMounse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer);
        e.preventDefault()
        timer = setTimeout(() => {
            setOpen(toggle)
        }, 300)
    }
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {}

    const hoverEvents = context.mode === 'horizontal' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMounse(e, true) },
        onMouseLeave: (e: React.MouseEvent) => { handleMounse(e, false) }
    } : {}
    const renderChildren = () => {
        const subMenuClasses = ClassNames('viking-submenu', {
            'menu-opened': menuOpen
        })
        const chilrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, { index: `${index}-${i}` })
            } else {
                console.error('warning:SubMenu的子元素必须是MenuItem')
            }
        })

        return (
            <Transition in={menuOpen} classNames="zoom-in-top" timeout={300} >
                <ul className={subMenuClasses}>{chilrenComponent}</ul>
            </Transition>
        )
    }

    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className={'submenu-title'} {...clickEvents}>
                {title}
                <Icon icon="angle-down" className="arrow-icon"></Icon>
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu';

export default SubMenu