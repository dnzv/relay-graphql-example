import './main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/Hello';

ReactDOM.render(<Hello />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}