import React from 'react';
import ImmutablePureComponent from 'react-immutable-pure-component';

export default class ComposeModal extends ImmutablePureComponent {

  render () {
    return (
      <div className='modal modal-compose'>
        <input type='text' autoFocus />
      </div>
    );
  }

}
