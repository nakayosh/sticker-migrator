import React from 'react';
import ImmtuablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';

export default class Stapck extends ImmutablePureComponent {

  static propTypes = {
    stpack: ImmtuablePropTypes.map,
  }

  render () {
    const { stpack } = this.props;

    return (
      <article className='stpack'>

        <div className='stpack__letter-head'>
          <div className='stpack__thumbnail'>
            <img src={stpack.get('thumbnail_url')} alt={stpack.get('name')} />
          </div>

          <h2 className='stpack__title'>
            { stpack.get('name') }
          </h2>
        </div>

        <div className='stpack__download-button'>
          <a href={stpack.get('url')} target='_blank'>
            <i className='fa fa-plus' />
            Add on Telegram
          </a>
        </div>
      </article>
    );
  }

}
