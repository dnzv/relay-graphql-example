import './main.css';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<h1>Hello from React!</h1>, document.getElementById('app'));

console.log('hello world!');

if (module.hot) {
  module.hot.accept();
}
