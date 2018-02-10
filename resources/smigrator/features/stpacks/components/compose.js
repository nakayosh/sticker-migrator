import React from 'react';
import PropTypes from 'prop-types';
import ImmtuablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { Picker } from 'emoji-mart';
import Overlay from 'react-overlays/lib/Overlay';
import detectPassiveEvents from 'detect-passive-events';
import LetterHead from '@/features/stpacks/components/letter_head';
import StickerEmojiSelector from '@/containers/sticker_emoji_selector_container';
import { FormattedMessage } from 'react-intl';

const listenerOptions = detectPassiveEvents.hasSupport ? { passive: true } : false;

export class EmojiPicker extends React.PureComponent {

  static propTypes = {
    style: PropTypes.object,
    stickerId: PropTypes.string,
    onAppend: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
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
    if ( !e.target.classList.contains('sticker_add-emojis') ) {
      this.props.onClose();
    }
  }

  handleKeyDown = e => {
    switch(e.key) {
    case 'Escape':
      this.props.onClose();
      break;
    }
  }

  handleAppend= emoji => {
    const { native } = emoji;

    if ( this.props.stickerId && native ) {
      this.props.onAppend(this.props.stickerId, native);
    }
  }

  render () {
    const { style } = this.props;
    const PICKER_WIDTH = 338;
    const PICKER_HEIGHT = 354;

    return (
      <div style={{ position: 'absolute', margin: 'auto', width: `${PICKER_WIDTH}px`, height: `${PICKER_HEIGHT}px`, ...style }} onKeyDown={this.handleKeyDown}>
        <Picker
          ref={this.setEmojiPickerRef}
          set='apple'
          color={false}
          showPreview={false}
          onClick={this.handleAppend}
          emojiTooltip
        />
      </div>
    );
  }

}

export default class Compose extends ImmutablePureComponent {

  static propTypes = {
    intl: PropTypes.object.isRequired,
    stpack: ImmtuablePropTypes.map,
    stickerId: PropTypes.string,
    submittable: PropTypes.bool.isRequired,
    onAppend: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  handlePatch = e => {
    e.preventDefault();

    // if (this.props.submittable) {
    this.props.onPatch();
    // }
  }

  setEmojiPickerRef = c => {
    this.emojiPicker = c;
  }

  renderItem (stickerId) {
    return (
      <li className='stpack__sticker' key={stickerId}>
        <StickerEmojiSelector stickerId={stickerId} />
      </li>
    );
  }

  render () {
    const { stpack, submittable, stickerId } = this.props;
    const targetNode = stickerId && document.querySelector(`.sticker[data-sticker-id="${stickerId}"]`);
    const placement  = targetNode && document.body.clientHeight - targetNode.offsetTop - targetNode.offsetHeight < 400 ? 'top' : 'bottom';

    if (!stpack) {
      return null;
    }

    return (
      <div className='stpack'>
        <LetterHead stpack={stpack} />

        <Overlay show={!!stickerId} placement={placement} target={targetNode}>
          <EmojiPicker
            stickerId={stickerId}
            onAppend={this.props.onAppend}
            onClose={this.props.onClose}
          />
        </Overlay>

        {/* <h3>1. Specify emojis to sticker</h3> */}

        <ul className='stpack__stickers'>
          { stpack.get('stickers').map(stickerId => this.renderItem(stickerId)) }
        </ul>

        {/* <h3>2. Click the button to publish</h3> */}

        <button className='rich-button button' onClick={this.handlePatch}>
          { submittable ? <FormattedMessage id='compose.publish' defaultMessage='Publish' /> : <FormattedMessage id='compose.specify_emojis' defaultMessage='Specify emoijs' /> }
        </button>
      </div>
    );
  }

}
