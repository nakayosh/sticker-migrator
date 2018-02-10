import React from 'react';
import ImmtuablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import LetterHead from '@/features/stpacks/components/letter_head';
import ProgressBar from '@/features/stpacks/components/progress_bar';
import StickerContainer from '@/containers/sticker_container';
import { COMPILING, UPLOADING, UPLOADED } from '@/features/stpacks/util/constants';

export default class Stickers extends ImmutablePureComponent {

  static propTypes = {
    stpack: ImmtuablePropTypes.map,
  }

  renderItem (stickerId, i) {
    const { stpack } = this.props;

    return (
      <li className='stpack__sticker' key={stickerId} aria-posinset={i+1} aria-setsize={stpack.get('stickers').size}>
        <StickerContainer stickerId={stickerId} />
      </li>
    );
  }

  render () {
    const { stpack } = this.props;

    if ( !stpack ) {
      return null;
    }

    return (
      <div className='stpack'>
        <LetterHead stpack={stpack} />

        { stpack.get('status') !== UPLOADED && <ProgressBar stpack={stpack} /> }

        {
          stpack.get('status') !== COMPILING &&
          stpack.get('status') !== UPLOADING &&
          (
            <ul className='stpack__stickers'>
              { stpack.get('stickers').map((stickerId, i) => this.renderItem(stickerId, i)) }
            </ul>
          )
        }
      </div>
    );
  }

}
