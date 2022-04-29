import React from 'react';
import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from './button';

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;


export const Default = Template.bind({});
Default.args = {
    children: 'Button',
};
Default.parameters = {
    docs: {
        description: {
             //markeDwon语法：如果要换行,在上一行结尾打两个空格
            story: `
\`import {Button} from armory/button\`  
\`import {Button} from armory/button\`
`,
        },
    },
};
//Default.decorators = [(Story) => <div style={{ margin: '3em' }}>{Story()}</div>];
export const DefaultButton = Template.bind({});

DefaultButton.parameters = {
    docs: {
        //markeDwon语法：如果要copy的代码只有一行 上一个空行必须有三个Tab分隔符(制表符)
        description: {
            story: `>引用button

            
    import {Button} from armory/button`,
        },
    },
};

DefaultButton.args = {
    children: 'DefaultButton',
    //onClick: action("click")
};
DefaultButton.storyName = "默认按钮"

export const Size = () => (
    <>
        <Button size='lg'>large button</Button>
        <Button size='sm'>samll button</Button>
    </>
)

export const Type = () => (
    <>
        <Button btnType="default">default button</Button>
        <Button btnType="primary">primary button</Button>
        <Button btnType='danger'>danger button</Button>
        <Button btnType='link' href='https://baidu.com'>link button</Button>
    </>
)

Type.decorators = [(Story: any) => <div style={{ margin: '1px' }}>{Story()}</div>];

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: '按钮',
    component: Button,
    //decorators: [(Story) => <div style={{ margin: '1px' }}>{Story()}</div>],
    argTypes: { onClick: { action: 'clicked' } },
    parameters: {
        docs: {
            description: {
                // component: `>引用button

                // import {Button} from armory/button`,

                component:`>引用button

<https://news.sina.com.cn/>

    import {Button} from armory/button   
    import {Button} from armory/button`
            },
        },
    },
} as ComponentMeta<typeof Button>;


// {
//     component:
// `>引用button

//

// import {Button} from armory/button
// <https://news.sina.com.cn/>
// `,
// }