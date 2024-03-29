import React, { ReactElement, InputHTMLAttributes, ChangeEvent } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import Icon from '../Icon/icon';

type InputSize = 'lg' | 'sm'
///////////////////////////////忽略size
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean,
    size?: InputSize,
    icon?: IconProp,
    /**添加前缀 用于配置一些固定组合 */
    prepend?: string | ReactElement,
    /**添加后缀 用于配置一些固定组合 */
    append?: string | ReactElement,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;

}
export const Input: React.FC<InputProps> = (props) => {
    const { disabled, size, icon, prepend, append, style, ...restProps } = props;
    const classes = classNames('viking-input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepend
    })

    const fixControlInput = (value: any) => {
        if (value === "undefined" || value === null) {
            return ""
        }
        return value;
    }

    if ("vaule" in props) {
        delete restProps.defaultValue;
        props.value = fixControlInput(props.value);
    }

    return (<div className={classes} style={style}>
        {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
        {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`} /></div>}
        <input
            className="viking-input-inner"
            disabled={disabled}
            {...restProps}
        />
        {append && <div className="viking-input-group-append">{append}</div>}
    </div>)
}


export default Input