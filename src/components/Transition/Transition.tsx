import React from "react";
//import ClassNames from "classnames";
import { CSSTransitionProps } from "react-transition-group/CSSTransition"
import { CSSTransition } from "react-transition-group"

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';

type TransitionProps = CSSTransitionProps & {
    animation?: AnimationName,
    //外套一个div，解决transition冲突问题
    wrapper?: boolean
}

let Transition: React.FC<TransitionProps> = (props) => {
    const { classNames, animation, wrapper, children, ...restProps } = props

    //let classnames = className("viking-transition", className)

    return (
        <CSSTransition classNames={classNames ? classNames : animation} {...restProps}>
            {wrapper ? <span style={{display: "inline-block"}}>{children}</span> : children}
        </CSSTransition>
    )
}

Transition.defaultProps = {
    unmountOnExit: true,
    appear: true
}
export default Transition