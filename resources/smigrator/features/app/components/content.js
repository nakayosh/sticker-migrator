import React from 'react';
import PropTypes from 'prop-types';

export default class Content extends React.Component {

  static propTypes = {
    children: PropTypes.node,
  }

  render () {
    const { children } = this.props;

    return (
      <div className='content'>
        {children}
      </div>
    );
  }

}
