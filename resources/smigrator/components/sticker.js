import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { defineMessages } from 'react-intl';
import { Emoji } from 'emoji-mart';

const messages = defineMessages({
  tooltip: { id: 'sticker.tooltip', defaultMessage: 'Show in fullscreen' },
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

  render () {
    const { intl, sticker, withEmojis } = this.props;

    if ( !sticker ) {
      return <p>no sticker specified</p>;
    }

    return (
      <button className='sticker button' onClick={this.handleOpenModal} title={intl.formatMessage(messages.tooltip)} aria-label={intl.formatMessage(messages.tooltip)}>
        <img src={sticker.get('original_url')} alt={sticker.get('emojis', '')} />

        {
          withEmojis && (
            <div className='sticker_emoji'>
              <div className='sticker_emoji-list'>
                <Emoji set='apple' emoji='santa' size={20} />
              </div>
            </div>
          )
        }
      </button>
    );
  }

}
