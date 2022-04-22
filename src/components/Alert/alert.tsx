import React, { useState, useEffect } from "react";
import ClassNames from 'classnames';
import Transition from "../Transition/Transition";
import Icon from "../Icon/Icon";
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
        <Transition in={Visible} timeout={200} animation="zoom-in-top">
            <div className={classes} {...restProps}>
                <div className='main'>
                    {title && <div className="title">{title}</div>}
                    {title && description && <div className='isolation'></div>}
                    <div className='content'>{description}</div>
                </div>
                <div className='side'>
                    {cloable ? <i><Icon onClick={() => setVisible(false)} icon="xmark"></Icon></i> : ''}
                </div>
            </div>
        </Transition>
    )
}

Alert.defaultProps = {
    cloable: true,
    type: AlertStyleType.Default
}

export default Alert