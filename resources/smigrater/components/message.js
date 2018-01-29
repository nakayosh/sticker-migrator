import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconButton from '../components/icon_button';

export default class Message extends React.PureComponent {

  static propTypes = {
    intl: PropTypes.object.isRequired,
    show: PropTypes.bool,
    text: PropTypes.string,
    time: PropTypes.number,
    onClose: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
  }

  componentWillReceiveProps (nextProps) {
    if ( nextProps.show ) {
      setTimeout(() => this.props.onClose(), this.props.time);
    }
  }

  render () {
    const { show, text, onClose } = this.props;

    return (
      <div className={classNames('message-container', { 'message-container--show': show })}>
        <div className='message'>
          <div className='message__text'>
            <span>{ text }</span>
          </div>

          <IconButton
            className='message__close-button'
            icon='icon-time'
            title='Dissmiss this message'
            onClick={onClose}
          />
        </div>
      </div>
    );
  }

}
