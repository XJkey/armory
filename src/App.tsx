import React, { useState } from 'react';
import './style/index.scss'
import Button from './components/Button/button';
import Alert, { AlertStyleType } from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Tabs from './components/Tabs/tabs'
import TabsItem from './components/Tabs/tabsItem'
import Icon from "./components/Icon/icon"
import Transition from './components/Transition/transition';
function App() {
  let [show, setshow] = useState(false);
  return (
    <div className="App">
      <Icon icon="arrow-down" theme="primary" />
      <header className="App-header">
        <Button onClick={() => { setshow(!show) }} ss='123'>hello</Button>
        <Transition in={show} timeout={500} wrapper animation="zoom-in-left">
          <Button>ssss</Button>
        </Transition>
        <Button className="custom" disabled>hello</Button>
        <Button btnType="primary" size="lg">hello</Button>
        <Button btnType="danger" size="sm">hello</Button>
        <Button btnType="link" disabled href="www.dsd.com">hello1</Button>
        <Button btnType="link" target='_blank' href="www.dsd.com">hello1</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Alert description='12343' cloable={true} onClose={() => { console.log(123) }}></Alert>
        <Alert style={{ margin: '20px 0' }} description='12343' cloable={false} onClose={() => { console.log(123) }}></Alert>
        <Alert style={{ margin: '20px 0' }} title='提示标题欧亲' description='this is a long description' onClose={() => { console.log(123) }}></Alert>
        <Alert style={{ margin: '20px 0' }} type={AlertStyleType.Danger} title='你好\(^o^)/~' cloable={true} onClose={() => { console.log(123) }}></Alert>

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
