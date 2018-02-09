import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePureComponent from 'react-immutable-pure-component';
import StickerContainer from '@/containers/sticker_container';

export default class StickerPreviewModal extends ImmutablePureComponent {

  static propTypes = {
    stickerId: PropTypes.string.isRequired,
  }

  render () {
    const { stickerId } = this.props;

    return (
      <div className='modal modal-stikcer-preview'>
        <StickerContainer stickerId={stickerId} withEmojis />
      </div>
    );
  }

}
