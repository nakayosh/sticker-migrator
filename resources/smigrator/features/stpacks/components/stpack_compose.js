import React from 'react';
import PropTypes from 'prop-types';
import ImmtuablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { Picker as EmojiPicker } from 'emoji-mart';
import Overlay from 'react-overlays/lib/Overlay';

import LetterHead from '@/features/stpacks/components/letter_head';
import StickerEmojiSelector from '@/containers/sticker_emoji_selector_container';

export default class StapckCompose extends ImmutablePureComponent {

  static propTypes = {
    intl: PropTypes.object.isRequired,
    stpack: ImmtuablePropTypes.map,
    targetNode: PropTypes.node,
    onappendStickerEmoji: PropTypes.func.isRequired,
    onExpandStickerEmojiPicker: PropTypes.func.isRequired,
  }

  handleappendStickerEmoji = emoji => {
    const stickerId  = this.props.targetNode.getAttribute('data-sticker-id');
    const { native } = emoji;

    if ( stickerId && native ) {
      this.props.onappendStickerEmoji(stickerId, native);
    }
  }

  handleExpandStickerEmojiPicker = e => {
    const stickerNode = e.currentTarget;

    if ( stickerNode ) {
      this.props.onExpandStickerEmojiPicker(stickerNode);
    }
  }

  handlePatch = e => {
    e.preventDefault();
    this.props.onPatch();
  }

  render () {
    const { stpack, targetNode } = this.props;

    if (!stpack) {
      return null;
    }

    return (
      <div className='stpack'>
        <LetterHead stpack={stpack} />

        <Overlay show={!!targetNode} placement='bottom' target={targetNode}>
          <EmojiPicker
            set='apple'
            color={false}
            showPreview={false}
            onClick={this.handleappendStickerEmoji}
            emojiTooltip
          />
        </Overlay>

        <h3>1. Specify emojis to sticker</h3>

        <ul className='stpack__stickers'>
          {
            stpack.get('stickers').size && stpack.get('stickers').map(stickerId => (
              <li className='stpack__sticker' key={stickerId}>
                <StickerEmojiSelector stickerId={stickerId} onClick={this.handleExpandStickerEmojiPicker} />
              </li>
            ))
          }
        </ul>

        <h3>2. Click the button to publish</h3>

        <button className='rich-button button' onClick={this.handlePatch}>
          Publish
        </button>
      </div>
    );
  }

}
