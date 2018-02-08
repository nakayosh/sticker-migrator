import React from 'react';
import ReactDOM from 'react-dom';
import ready from './ready';
import Smigrator from './containers/smigrator';
import OfflinePlugin from 'offline-plugin/runtime';
import 'font-awesome/css/font-awesome.css';

OfflinePlugin.install();

ready(() => {
  const mountNode = document.getElementById('root');
  const props = JSON.parse(mountNode.getAttribute('data-props'));
  ReactDOM.render(<Smigrator {...props} />, mountNode);
});
