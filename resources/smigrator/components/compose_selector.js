import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { defineMessages, injectIntl } from 'react-intl';

const messages = defineMessages({
  emoji_specification: { id: 'sticker.emoji_specification', defaultMessage: 'Click to specify emoji' },
});

@injectIntl
export default class ComposeSelector extends ImmutablePureComponent {

  static propTypes = {
    sticker: ImmutablePropTypes.map,
    onRemove: PropTypes.func.isRequired,
    onExpand: PropTypes.func.isRequired,
  }

  handleRemove = e => {
    e.preventDefault();

    const index = e.currentTarget.getAttribute('data-index');

    if ( index !== null ) {
      this.props.onRemove(this.props.sticker.get('id_str'), index);
    }
  }

  handleExpand = e => {
    e.preventDefault();
    this.props.onExpand();
  }

  renderEmojiButton = (emoji, i) => {
    return (
      <li className='compose-selector-actions__list-item' key={`${i}-${emoji}`}>
        <button className='compose-selector__emoji-button button' data-index={i} onClick={this.handleRemove}>
          { emoji }
        </button>
      </li>
    );
  }

  render () {
    const { intl, sticker } = this.props;

    if ( !sticker ) {
      return null;
    }

    const specified = !!sticker.get('emojis').size;

    return (
      <div className={`compose-selector button ${ specified ? 'compose-selector--specified' : '' }`} data-sticker-id={sticker.get('id')}>
        <button
          className='compose-selector__expand button'
          title={intl.formatMessage(messages.emoji_specification)}
          aria-label={intl.formatMessage(messages.emoji_specification)}
          onClick={this.handleExpand}
        >
          <img src={sticker.get('original_url')} alt={sticker.get('emojis').join('')} />
        </button>

        <div className='compose-selector-actions'>
          <ul className='compose-selector-actions__list'>
            { !!sticker.get('emojis').size && sticker.get('emojis').map((emoji, i) => this.renderEmojiButton(emoji, i)) }
          </ul>
        </div>
      </div>
    );
  }

}
