import React from 'react';
import classNames from 'classnames';
export enum ButtonSize {
    large = 'Lg',
    Small = 'sm'
}

export enum ButtonType {
    Primay = 'primay',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}

interface BaseButtonProps {
    className?: string,
    disabled?: boolean,
    size?: ButtonSize,
    btnType?: ButtonType,
    children: React.ReactNode,
    href?: string
}


const Button: React.FC<BaseButtonProps> = (props) => {
    const { disabled, size, btnType, children, href } = props;
    const classes = classNames('btn', {
        [`btn-${btnType}`]: ButtonType,
        [`btn-${size}`]: size,
        'disabled': (btnType === ButtonType.Link) && disabled
    })
    console.log(classes)
    if (btnType === ButtonType.Link && href) {
        return (
            <a className={classes} href={href}>{children}</a>
        )
    } else {
        return (
            <button className={classes} disabled={disabled}>{children}</button>
        )
    }
}


Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
}

export default Button