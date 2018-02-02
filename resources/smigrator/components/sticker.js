import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';

export default class Sticker extends ImmutablePureComponent {

  static propTypes = {
    sticker: ImmutablePropTypes.map,
    onClick: PropTypes.func.isRequired,
  }

  render () {
    const { sticker } = this.props;

    if ( !sticker ) {
      return <p>no sticker specified</p>;
    }

    return (
      <button className='sticker button' onClick={this.props.onClick} >
        <img src={sticker.get('original_url')} alt={sticker.get('emoji', '')} />
      </button>
    );
  }

}
