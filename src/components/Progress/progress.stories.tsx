import { ComponentMeta } from "@storybook/react";
import React, { useState, useEffect } from "react";
import { Progress } from "./progress";

export const Default = () => {
    const [num, setnum] = useState(0);
    useEffect(() => {
        setTimeout(() => {
            setnum((revNum) => {
                return revNum + 50
            })
        }, 1000)
    }, [])

    return (
        <Progress percent={num} strokeHeight={14} theme="danger"></Progress >
    )
}

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: '进度条',
    component: Progress,
    //decorators: [(Story) => <div style={{ margin: '1px' }}>{Story()}</div>],
    argTypes: { onClick: { action: 'clicked' } },
    parameters: {
        docs: {
            description: {


                component: `>引用button

<https://news.sina.com.cn/>

    import {progress} from armory/progress   
    import {progress} from armory/progress`
            },
        },
    },
} as ComponentMeta<typeof Progress>;