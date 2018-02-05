import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { Emoji } from 'emoji-mart';

import IconButton from '../components/icon_button';

export default class Sticker extends ImmutablePureComponent {

  static propTypes = {
    sticker: ImmutablePropTypes.map,
    onOpenModal: PropTypes.func.isRequired,
  }

  handleOpenModal = e => {
    e.preventDefault();
    this.props.onOpenModal();
  }

  render () {
    const { sticker } = this.props;

    if ( !sticker ) {
      return <p>no sticker specified</p>;
    }

    return (
      <button className='sticker button' onClick={this.handleOpenModal} >
        <img src={sticker.get('original_url')} alt={sticker.get('emojis', '')} />

        <div className='sticker_emoji'>
          <div className='sticker_emoji-list'>
            <Emoji set='apple' emoji='santa' size={20} />
          </div>
        </div>
      </button>
    );
  }

}
