import React from 'react';
import ReactDOM from 'react-dom';
import ready from './ready';
import Smigrator from './containers/smigrator';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import 'font-awesome/css/font-awesome.css';

if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install();
}

ready(() => {
  const mountNode = document.getElementById('root');
  const props = JSON.parse(mountNode.getAttribute('data-props'));
  ReactDOM.render(<Smigrator {...props} />, mountNode);
});
