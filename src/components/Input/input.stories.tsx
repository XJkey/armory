import React, { useState } from "react";
import { Input } from "./input";
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Icon } from "../Icon/icon";

const InputTemplate: ComponentStory<typeof Input> = (args) => <Input {...args} />

const ControlInput: ComponentStory<typeof Input> = () => {
    const [value, setValue] = useState("");

    return (<InputTemplate value={value} onChange={(e) => { setValue(e.target.value ) }} />)
}

export const Control = ControlInput.bind({});;

Control.storyName = '受控输入框'

export const Default = InputTemplate.bind({});

Default.storyName = '默认输入框'

export const Prepend = InputTemplate.bind({});

Prepend.storyName = "带前缀输入框"

Prepend.args = {
    prepend: "前缀"
}

export const Append = InputTemplate.bind({});

Append.storyName = "带后缀输入框"

Append.args = {
    append: "后缀"
}


export const IconInput = InputTemplate.bind({});

IconInput.storyName = "带图标输入框"

IconInput.args = {
    append: <Icon icon="arrow-down" theme="primary" />
}

//Append.decorators = [(Story: any) => <div style={{ margin: '0 200px' }}>{Story()}</div>];

export default {
    title: "输入框",
    component: Input,
    decorators: [(Story) => <div style={{ margin: '0 auto', width: "300px" }}>{Story()}</div>],
} as ComponentMeta<typeof Input>;