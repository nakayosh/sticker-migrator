import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    className: '',
  }

  render () {
    const { className, text, title, active, onClick, ...other } = this.props;

    return (
      <button
        className={`${className} button`}
        title={title}
        aria-label={title}
        onClick={onClick}
        {...other}
      >
        {text}
      </button>
    );
  }

}
