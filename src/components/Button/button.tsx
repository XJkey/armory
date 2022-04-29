import React from 'react';
import classNames from 'classnames';

export type ButtonSize = 'lg' | 'sm'


export type ButtonType = 'primary' | 'default' | 'danger' | 'link'


interface BaseButtonProps {
    className?: string,
    disabled?: boolean,
    /**设置按钮大小 */
    size?: ButtonSize,
    /**设置按钮类型 */
    btnType?: ButtonType,
    
    children: React.ReactNode,
    href?: string,
    [propName: string]: any
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AuchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AuchorButtonProps>;
// /**
//  * ### 引用
//  * ~~~js
//  * import {Button} from armory/button
//  * ~~~
//  *  */
const Button: React.FC<ButtonProps> = (props) => {
    const { disabled, size, btnType, children, className, href, ...restProps } = props;
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === "link") && disabled
    })
    if (btnType === "link" && href) {
        return (
            <a className={classes} href={href} {...restProps}>{children}</a>
        )
    } else {
        return (
            <button className={classes} disabled={disabled} {...restProps}>{children}</button>
        )
    }
}


Button.defaultProps = {
    disabled: false,
    btnType: "primary"
}

export default Button;

export { Button }