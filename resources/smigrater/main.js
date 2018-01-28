import React from 'react';
import ReactDOM from 'react-dom';
import ready from './ready';
import Smigrater from './containers/smigrater';
import 'font-awesome/css/font-awesome.css';

ready(() => {
  const mountNode = document.getElementById('root');
  const props = JSON.parse(mountNode.getAttribute('data-props'));
  ReactDOM.render(<Smigrater {...props} />, mountNode);
});
