import React, { useState, createContext } from "react";
import ClassNames from "classnames";
import { MenuItemProps } from "./menuItem";


type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
    defalutIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
    defaultOpenSubMenus?: string[]
}

interface IMenuContext {
    index: string,
    onSelect?: SelectCallback,
    mode?: MenuMode,
    defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })
const Menu: React.FC<MenuProps> = (props) => {
    const { defalutIndex, className, mode, style, children, onSelect, defaultOpenSubMenus } = props;
    const [currentActive, setActive] = useState(defalutIndex);

    const classes = ClassNames('viking-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    })

    const handleClik = (index: string) => {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    }

    const passedContext: IMenuContext = {
        index: currentActive || '0',
        onSelect: handleClik,
        mode,
        defaultOpenSubMenus
    }

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            const { displayName } = childElement.type;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, { index: index.toString() })
            } else {
                console.log('waring:menu的子元素必须是MenuItem')
            }
        })
    }

    return (
        <ul className={classes} style={style} data-testid='test-menu'>
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defalutIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
}

export default Menu