import React from 'react';
import ImmtuablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import LetterHead from '@/features/stpacks/components/letter_head';
import ProgressBar from '@/features/stpacks/components/progress_bar';
import StickerContainer from '@/containers/sticker_container';

import { COMPILING, UPLOADING, UPLOADED } from '@/features/stpacks/util/constants';

export default class Stapck extends ImmutablePureComponent {

  static propTypes = {
    stpack: ImmtuablePropTypes.map,
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

        <ul className='stpack__stickers'>
          {
            stpack.get('status') !== COMPILING && stpack.get('status') !==  UPLOADING && (
              stpack.get('stickers').size && stpack.get('stickers').map(stickerId => (
                <li className='stpack__sticker' key={stickerId}>
                  <StickerContainer stickerId={stickerId} />
                </li>
              ))
            )
          }
        </ul>
      </div>
    );
  }

}
