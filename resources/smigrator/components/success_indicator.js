import React from 'react';
import PropTypes from 'prop-types';

export default class SuccessIndicator extends React.PureComponent {

  static propTypes = {
    time: PropTypes.number,
    children: PropTypes.node,
  }

  static defaultProps = {
    time: 1000,
  }

  state = {
    revealed: false,
  }

  componentWillMount () {
    setTimeout(() => this.setState({ revealed: true }), this.props.time);
  }

  render () {
    const { time, children } = this.props;
    const { revealed } = this.state;

    const style = {
      opacity: revealed ? '0' : '1',
      transition: `${time}ms ease-out`,
    };

    return (
      <div className='success-indicator'>
        <div className='success-indicator__content'>
          { children }
        </div>

        <div className='success-indicator__veal' style={style}>
          <i className='fa fa-check' aria-hidden />
        </div>
      </div>
    );
  }

}
