import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';

import IconButton from '../components/icon_button';

export default class StickerEmojiSelector extends ImmutablePureComponent {

  static propTypes = {
    sticker: ImmutablePropTypes.map,
    onChangeEmoji: PropTypes.func.isRequired,
    onExpandEmojiPicker: PropTypes.func.isRequired,
  }

  setRef = c => {
    this.node = c;
  }

  handleChangeEmoji = e => {
    const value = e.currentTarget.value;
    this.props.onChangeEmoji(value);
  }

  handleExpandEmojiPicker = () => {
    this.props.onExpandEmojiPicker(this.node);
  }

  render () {
    const { sticker } = this.props;

    if ( !sticker ) {
      return <p>no sticker specified</p>;
    }

    return (
      <div className='sticker sticker-emoji-selector button' ref={this.setRef} data-sticker-id={sticker.get('id')}>
        <img src={sticker.get('original_url')} alt={sticker.get('emojis', '😀')} />

        <input
          className='sticker_emojis rich-input input'
          type='text'
          value={sticker.get('emojis', '😀')}
          onChange={this.handleChangeEmoji}
        />

        <IconButton
          className='sticker_add-emojis rich-button button'
          icon='fa fa-smile-o'
          title='Add emojis'
          onClick={this.handleExpandEmojiPicker}
        />
      </div>
    );
  }

}
