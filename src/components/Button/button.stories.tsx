import React from 'react';
import { action } from '@storybook/addon-actions';
import { ComponentMeta } from '@storybook/react';

import Button from './button';


export const DefaultButton = () => (<Button onClick={action("click")}> DefaultButton</Button>)

DefaultButton.story = {
    name: "默认按钮"
}

export const ButtonWithSize = () => (
    <>
        <Button size='lg'>large button</Button>
        <Button size='sm'>samll button</Button>
    </>
)

export const ButtonWithType = () => (
    <>
        <Button btnType="default">default button</Button>
        <Button btnType="primary">primary button</Button>
        <Button btnType='danger'>danger button</Button>
        <Button btnType='link' href='https://baidu.com'>link button</Button>
    </>
)

ButtonWithType.decorators = [(Story:any) => <div style={{ margin: '1px' }}>{Story()}</div>];

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: '按钮',
    component: Button,
    decorators: [
        (Story) => (
            <div style={{ textAlign: "center" }}>
                <Story />
            </div>
        ),
    ],
} as ComponentMeta<typeof Button>;