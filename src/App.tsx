import React, { ChangeEvent } from 'react';
import './style/index.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Alert, { AlertStyleType } from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Tabs from './components/Tabs/tabs';
import TabsItem from './components/Tabs/tabsItem';
import Icon from './components/Icon/icon';
import Input from './components/Input/input';
import { AutoComplete, DataSourceType } from './components/autoComplete/autoComplete';


library.add(fas)
interface LakerPlyerProps {
  value: string;
  number?: number
}
const SimpleComplete = () => {
  //const laker = ['bdfbdf', 'dfgggg', 'weqqu', 'ykiils']
  //const laker1: LakerPlyerProps[] = [{ value: 'bdfbdf' }, { value: 'dfgggg' }, { value: 'weqqu' }, { value: 'ykiils' }]

  const handleFetch = (query: string) => {
    //return laker.filter(name => name.includes(query))
    //return laker1.filter(name => name.value.includes(query))
    return fetch(`https://api.github.com/search/users?q=${query}`).then(res=>res.json())
    .then(({items})=>{
      return items.slice(0,10).map((item: any)=>({value:item.login,...item}))
    })
  }
  const renderOption = (item: DataSourceType<LakerPlyerProps>) => {
    return (
      <h2>name:{item.value}</h2>
    )
  }
  return (<AutoComplete renderOption={renderOption} fetchSuggestions={handleFetch} onSelect={(value) => { console.log(value) }} />)
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon="coffee" theme="danger" size="10x" />
        <Input />
        <Input icon='angle-down' />
        <Input append="@qq" onChange={(e) => { console.log((e as ChangeEvent<HTMLInputElement>).target.value) }} />
        <input onChange={(e) => { console.log(e.target.value) }} />


        <Button disabled onClick={() => { alert(123) }} ss='123'>hello</Button>
        <Button className="custom" disabled>hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>hello</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>hello</Button>
        <Button btnType={ButtonType.Link} disabled href="www.dsd.com">hello1</Button>
        <Button btnType={ButtonType.Link} target='_blank' href="www.dsd.com">hello1</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Alert description='12343' cloable={true} onClose={() => { console.log(123) }}></Alert>

        <Alert style={{ margin: '20px 0' }} description='12343' cloable={false} onClose={() => { console.log(123) }}></Alert>
        <Alert style={{ margin: '20px 0' }} title='提示标题欧亲' description='this is a long description' onClose={() => { console.log(123) }}></Alert>
        <Alert style={{ margin: '20px 0' }} type={AlertStyleType.Danger} title='你好\(^o^)/~' cloable={true} onClose={() => { console.log(123) }}></Alert>
        <SimpleComplete />
        <div>Learn React</div>
        <Menu defalutIndex={'1'} mode='horizontal'>
          <MenuItem >1</MenuItem>
          <MenuItem >2</MenuItem>
          <SubMenu title="5555">
            <MenuItem >12222</MenuItem>
            <MenuItem >2333333</MenuItem>
            <MenuItem >3444444</MenuItem>
          </SubMenu>
          <MenuItem>3</MenuItem>
        </Menu>

        <Menu defalutIndex={'2'} mode='vertical' defaultOpenSubMenus={['2']} onSelect={(index) => alert(index)}>
          <MenuItem >1</MenuItem>
          <MenuItem >2</MenuItem>
          <SubMenu title="5555">
            <MenuItem >12222</MenuItem>
            <MenuItem >2333333</MenuItem>
            <MenuItem >3444444</MenuItem>
          </SubMenu>
          <MenuItem>3</MenuItem>
        </Menu>


        <Tabs onSelect={(index) => alert(index)}>
          <TabsItem index={0} title="dff">4543535</TabsItem>
          <TabsItem disabled index={1} title="d5f">4ggggg5</TabsItem>
          <TabsItem index={1} title="d5f">4ggggg5</TabsItem>
        </Tabs>
      </header>
    </div>
  );
}

export default App;
