import React from "react";
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import ClassNames from "classnames";
library.add(fas);


type ThemeProps = "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "light" | "dark";

interface IconProps extends FontAwesomeIconProps {
    thems?: ThemeProps
}


let Icon: React.FC<IconProps> = (props) => {
    let { thems, className, ...restProps } = props;
    let classes = ClassNames("viking-icon", className, {
        [`icon-${thems}`]: thems
    })
    return <FontAwesomeIcon className={classes} {...restProps} />
}

export default Icon