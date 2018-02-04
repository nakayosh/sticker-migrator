import React from 'react';
import PropTypes from 'prop-types';

export default class Page extends React.PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  render () {
    const { children } = this.props;

    return (
      <main className='page'>
        { children }
      </main>
    );
  }

}
