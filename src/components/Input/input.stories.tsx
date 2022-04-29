import React from "react";
import { Input } from "./input";
import { ComponentMeta, ComponentStory } from '@storybook/react';

const InputTemplate: ComponentStory<typeof Input> = (args) => <Input {...args} />

export const Default = InputTemplate.bind({});

Default.parameters = {
    doc: {
        discripution: "默认输入框"
    }
}

Default.storyName = 'Default' 

export const Prepend = InputTemplate.bind({});

Prepend.parameters = {
    doc: {
        discripution: "前缀输入框"
    }
}

Prepend.args = {
    prepend: "前缀"
}

export const Append = InputTemplate.bind({});

Append.parameters = {
    doc: {
        discripution: "后缀输入框"
    }
}

Append.args = {
    append: "后缀"
}

//Append.decorators = [(Story: any) => <div style={{ margin: '0 200px' }}>{Story()}</div>];

export default {
    title: "输入框",
    component: Input,
    decorators: [(Story) => <div style={{ margin: '0 200px' }}>{Story()}</div>],
} as ComponentMeta<typeof Input>;