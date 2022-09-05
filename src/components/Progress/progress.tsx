import React, { FC, StyleHTMLAttributes } from "react";
import { ThemeProps } from "../Icon/icon"
interface ProgressProps {
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: ThemeProps;
}

export const Progress: FC<ProgressProps> = (props) => {
    const { percent, strokeHeight, showText, styles, theme } = props;
    console.log(theme)
    return (
        <div style={{ ...styles, height: strokeHeight + 'px' }} className={`viking-progress`}>
            <div className={`bar viking-progress-${theme}`} style={{ width: (percent >= 100 ? 100 : percent) + '%' }}>
                <span className="text" style={{ lineHeight: strokeHeight + 'px' }}>
                    {showText && ((percent >= 100 ? 100 : percent) + "%")}
                </span>
            </div>
        </div>
    )
}

Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    percent: 0,
    theme:"primary"
}

export default Progress;