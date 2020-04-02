import React from 'react';
import './style/index.scss'
import Button, { ButtonType, ButtonSize } from './components/Button/button'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button disabled>hello</Button>
        <Button btnType={ButtonType.Primay} size={ButtonSize.large}>hello</Button>
        <Button btnType={ButtonType.Link} disabled href="www.dsd.com">hello1</Button>
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
