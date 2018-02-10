import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  fullscreen: { id: 'sticker.fullscreen', defaultMessage: 'Show in fullscreen' },
});

export default class Sticker extends ImmutablePureComponent {

  static propTypes = {
    intl: PropTypes.object.isRequired,
    sticker: ImmutablePropTypes.map,
    withEmojis: PropTypes.bool,
    onOpenModal: PropTypes.func.isRequired,
  }

  handleOpenModal = e => {
    e.preventDefault();
    this.props.onOpenModal();
  }

  renderEmoji = (emoji, i) => {
    return (
      <li className='sticker_emoji-list-item' key={`${i}-${emoji}`}>
        { emoji }
      </li>
    );
  }

  render () {
    const { intl, sticker, withEmojis } = this.props;

    if ( !sticker ) {
      return null;
    }

    return (
      <button className='sticker button' onClick={this.handleOpenModal} title={intl.formatMessage(messages.fullscreen)} aria-label={intl.formatMessage(messages.fullscreen)}>
        <img src={sticker.get('original_url')} />

        {
          withEmojis && (
            <div className='sticker_emoji'>
              <ul className='sticker_emoji-list'>
                { sticker.get('emojis').map((emoji, i) => this.renderEmoji(emoji, i)) }
              </ul>
            </div>
          )
        }
      </button>
    );
  }

}
