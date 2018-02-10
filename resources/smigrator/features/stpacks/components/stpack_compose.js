import React from 'react';
import PropTypes from 'prop-types';
import ImmtuablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { Picker as EmojiPicker } from 'emoji-mart';
import Overlay from 'react-overlays/lib/Overlay';
import detectPassiveEvents from 'detect-passive-events';
import LetterHead from '@/features/stpacks/components/letter_head';
import StickerEmojiSelector from '@/containers/sticker_emoji_selector_container';

const listenerOptions = detectPassiveEvents.hasSupport ? { passive: true } : false;

export default class StapckCompose extends ImmutablePureComponent {

  static propTypes = {
    intl: PropTypes.object.isRequired,
    stpack: ImmtuablePropTypes.map,
    targetNode: PropTypes.node,
    onAppendStickerEmoji: PropTypes.func.isRequired,
    onExpand: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  }

  componentDidMount () {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, listenerOptions);
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, listenerOptions);
  }

  handleDocumentClick = e => {
    if (this.node && !this.node.contains(e.target)) {
      this.props.onHide();
    }
  }

  handleappendStickerEmoji = emoji => {
    const stickerId  = this.props.targetNode.getAttribute('data-sticker-id');
    const { native } = emoji;

    if ( stickerId && native ) {
      this.props.onAppendStickerEmoji(stickerId, native);
    }
  }

  handleExpandStickerEmojiPicker = e => {
    const stickerNode = e.currentTarget;

    if ( stickerNode ) {
      this.props.onExpand(stickerNode);
    }
  }

  handlePatch = e => {
    e.preventDefault();
    this.props.onPatch();
  }

  setRef = c => {
    this.node = c;
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
          <div ref={this.setRef}>
            <EmojiPicker
              set='apple'
              color={false}
              showPreview={false}
              onClick={this.handleappendStickerEmoji}
              emojiTooltip
            />
          </div>
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
