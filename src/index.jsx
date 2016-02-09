import './main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import Relay from 'react-relay';

ReactDOM.render(<Main />, document.getElementById('app'));

console.log(
  Relay.QL `
    query Test {
      links {
        url,
        title
      }
    }
  `
);

if (module.hot) {
  module.hot.accept();
}
