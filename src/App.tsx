import React from 'react';
import './style/index.scss'
import Button, { ButtonType, ButtonSize } from './components/Button/button'
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
