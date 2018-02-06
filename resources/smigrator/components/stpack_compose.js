import React from 'react';
import PropTypes from 'prop-types';
import ImmtuablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { Link } from 'react-router-dom';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { Picker as EmojiPicker } from 'emoji-mart';
import Overlay from 'react-overlays/lib/Overlay';

import LoadingIndicator from '../components/loading_indicator';
import StickerEmojiSelector from '../containers/sticker_emoji_selector_container';

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
      return (
        <article className='stpack'>
          <LoadingIndicator />
        </article>
      );
    }

    return (
      <article className='stpack module'>
        <div className='stpack__letter-head'>
          <div className='stpack__thumbnail'>
            <img src={stpack.get('thumbnail_url')} alt={stpack.get('name')} />
          </div>

          <div className='stpack__meta'>
            <time className='stpack__time' timestamp={stpack.get('created_at')}>
              <i className='fa fa-clock-o' aria-hidden />

              <FormattedDate
                value={new Date(stpack.get('created_at'))}
                hour12={false}
                year='numeric'
                month='short'
                day='2-digit'
                hour='2-digit'
                minute='2-digit'
              />
            </time>

            <h2 className='stpack__title'>
              <Link to={`/stpacks/${stpack.get('id_str')}`}>
                { stpack.get('name') }
              </Link>
            </h2>

            <div className='stpack__buttons-wrapper'>
              <div className='stpack__download-button'>
                <a className='rich-button'>
                  <i className='fa fa-plus' />
                  Not download-able yet
                </a>
              </div>
            </div>
          </div>
        </div>

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
      </article>
    );
  }

}
