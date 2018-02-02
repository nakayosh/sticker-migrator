import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconButton from '../components/icon_button';

export default class Message extends React.PureComponent {

  static propTypes = {
    show: PropTypes.bool,
    text: PropTypes.string,
    time: PropTypes.number,
    onClose: PropTypes.func.isRequired,
  }

  componentWillReceiveProps (nextProps) {
    if ( nextProps.show ) {
      setTimeout(() => this.props.onClose(), this.props.time);
    }
  }

  render () {
    const { show, text } = this.props;

    return (
      <div className={classNames('message-container', { 'message-container--show': show })}>
        <div className='message'>
          <div className='message__text'>
            <span>{ text }</span>
          </div>

          <IconButton
            className='message__close-button'
            icon='fa fa-time'
            title='Dissmiss this message'
            onClick={this.props.onClose}
          />
        </div>
      </div>
    );
  }

}
