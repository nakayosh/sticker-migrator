import React from 'react';

export default class LoadingIndicator extends React.PureComponent {

  render () {
    return (
      <div className='loading-indicator'>
        <i className='fa fa-spin fa-spinner' aria-hidden />
      </div>
    );
  }

}
