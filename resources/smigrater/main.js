import React from 'react';
import ReactDOM from 'react-dom';
import ready from './ready';
import Smigrator from './containers/smigrator';
import 'font-awesome/css/font-awesome.css';

ready(() => {
  const mountNode = document.getElementById('root');
  const props = JSON.parse(mountNode.getAttribute('data-props'));
  ReactDOM.render(<Smigrator {...props} />, mountNode);
});
