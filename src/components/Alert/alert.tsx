import React, { useState, useEffect } from "react";
import ClassNames from 'classnames';
export enum AlertStyleType {
    Default = 'default',
    Danger = 'danger',
}
interface BaseAlertProps {
    title?: string,
    description: string,
    type?: AlertStyleType,
    onClose?: Function,
    cloable?: boolean
}

export type AlertProps = Partial<BaseAlertProps & React.HTMLAttributes<HTMLElement>>;

const Alert: React.FC<AlertProps> = (props) => {    
    const [Visible, setVisible] = useState(true)
    const { title, description, type, onClose, cloable, className, ...restProps } = props;
    const classes = ClassNames('alert', className, {
        [`alert-${type}`]: type
    })
    useEffect(() => {
        return function () {
            if (onClose) {
                onClose()
            }
        }
    })
    return (
        <>
            {Visible ? (<div className={classes} {...restProps}>
                <div className='main'>
                    {title && <div className="title">{title}</div>}
                    {title && description && <div className='isolation'></div>}
                    <div className='content'>{description}</div>
                </div>
                <div className='side'>
                    {cloable ? <i onClick={() => setVisible(false)}>×</i> : ''}
                </div>
            </div>) : null}
        </>
    )
}

Alert.defaultProps = {
    cloable:true,
    type:AlertStyleType.Default
}

export default Alert