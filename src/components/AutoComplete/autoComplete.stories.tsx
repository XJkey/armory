import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AutoComplete, DataSourceType } from './autoComplete';

const Template: ComponentStory<typeof AutoComplete> = (args) => <AutoComplete {...args} />;
interface LakerPlayerProps {
    value: string;
    number: number;
}
const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
    'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']

export const Default = Template.bind({});
Default.args = {
    fetchSuggestions: (value) => lakers.filter((item) => item.includes(value)).map((item) => ({ value: item })),
    onSelect: (item) => console.log(item),
};
Default.storyName = "自动加载输入框"


const lakersWithNumber = [
    { value: 'bradley', number: 11 },
    { value: 'pope', number: 1 },
    { value: 'caruso', number: 4 },
    { value: 'cook', number: 2 },
    { value: 'cousins', number: 15 },
    { value: 'james', number: 23 },
    { value: 'AD', number: 3 },
    { value: 'green', number: 14 },
    { value: 'howard', number: 39 },
    { value: 'kuzma', number: 0 },
]

export const TemplateComplte = Template.bind({});
TemplateComplte.args = {
    fetchSuggestions: (value) => lakersWithNumber.filter((item) => item.value.includes(value)),
    onSelect: (item) => console.log(item),
    renderOption: (item) => {
        //const lakersItem = item as DataSourceType<LakerPlayerProps>
        return (<><h1>{item.value}</h1><div>{item.number}</div></>)
    }
};
TemplateComplte.storyName = "带模板的自动加载输入框"


export const asyncComplte = Template.bind({});

const handleFetch = (value: string) => {
    return fetch(`https://api.github.com/search/users?q=${value}`)
        .then((result) => { console.log(result); return result.json() })
        .then(({ items }) => {
            return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
        })
}

asyncComplte.args = {
    fetchSuggestions: (value) => {
        return handleFetch(value)
    },
    onSelect: (item) => console.log(item),
    renderOption: (item) => {
        //const lakersItem = item as DataSourceType<LakerPlayerProps>
        return (<><h1>{item.value}</h1><div>{item.url}</div></>)
    }
};
asyncComplte.storyName = "异步的自动加载输入框"

export default {
    title: 'AutoComplete',
    component: AutoComplete,
    decorators: [(Story) => <div style={{ margin: '0 auto', width: "300px" }}>{Story()}</div>],
} as ComponentMeta<typeof AutoComplete>;

