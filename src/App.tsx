import React from 'react';
import './style/index.scss'
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Alert, { AlertStyleType } from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'


function App() {
  return (
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
