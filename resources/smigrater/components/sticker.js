import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';

export default class Sticker extends ImmutablePureComponent {

  static propTypes = {
    sticker: ImmutablePropTypes.map,
  }

  render () {
    const { sticker } = this.props;

    if ( !sticker ) {
      return null;
    }

    return (
      <div className='sticker'>
        <img src={sticker.get('url')} alt={sticker.get('emoji')} />
      </div>
    );
  }

}
