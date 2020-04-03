import React from 'react';
import './style/index.scss'
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Alert,{AlertStyleType} from './components/Alert/alert'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={()=>{alert(123)}} ss='123'>hello</Button>
        <Button className="custom" disabled>hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>hello</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>hello</Button>
        <Button btnType={ButtonType.Link} disabled href="www.dsd.com">hello1</Button>
        <Button btnType={ButtonType.Link} target='_blank' href="www.dsd.com">hello1</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Alert description='12343' cloable={true} onClose={()=>{alert(123)}}></Alert>

        <Alert style={{margin:'20px 0'}} description='12343' cloable={false} onClose={()=>{alert(123)}}></Alert>    
        <Alert style={{margin:'20px 0'}} title='提示标题欧亲' description='this is a long description'  onClose={()=>{alert(123)}}></Alert>   
        <Alert style={{margin:'20px 0'}} type={AlertStyleType.Danger} title='你好\(^o^)/~'  cloable={false} onClose={()=>{alert(123)}}></Alert>           
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
