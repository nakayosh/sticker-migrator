import React from 'react';
import { Link } from 'react-router-dom';
import ImmtuablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import querystring from 'querystring';

import Dropdown from '../containers/dropdown_container';
import LoadingIndicator from '../components/loading_indicator';
import StickerContainer from '../containers/sticker_container';

export default class Stapck extends ImmutablePureComponent {

  static propTypes = {
    stpack: ImmtuablePropTypes.map,
  }

  handleDownload = e => {
    e.preventDefault();

    const url        = this.props.stapck.get('url');
    const short_name = this.props.stpack.get('short_name');

    setTimeout(() => {
      window.location = url;
    }, 100);

    window.location = `tg://addstickers?${querystring.encode({ set: short_name })}`;
  }

  render () {
    const { stpack } = this.props;

    if (!stpack) {
      return (
        <article className='stpack'>
          <LoadingIndicator />
        </article>
      );
    }

    const items = [
      { text: 'Visit original',      href: stpack.get('original_url') },
      { text: 'Share with LINE',     href: `https://lineit.line.me/share/ui?url=${ window.location.href }` },
      { text: 'Share with Telegram', href: `https://t.me/share/url?url=${ window.location.href }` },
    ];

    return (
      <article className='stpack'>
        <div className='stpack__letter-head'>
          <div className='stpack__thumbnail'>
            <img src={stpack.get('thumbnail_url')} alt={stpack.get('name')} />
          </div>

          <div className='stpack__meta'>
            <time className='stpack__time' timestamp={stpack.get('created_at')}>
              <i className='fa fa-clock-o' aria-hidden />
              { stpack.get('created_at') }
            </time>

            <h2 className='stpack__title'>
              <Link to={`/stpacks/${stpack.get('id_str')}`}>
                { stpack.get('name') }
              </Link>
            </h2>

            <div className='stpack__buttons-wrapper'>
              <div className='stpack__download-button'>
                <a className='rich-button' href={stpack.get('url')} target='_blank' onClick={this.handleDownload}>
                  <i className='fa fa-plus' />
                  Add on Telegram
                </a>
              </div>

              <div className='stpack__dropdown-menu'>
                <Dropdown
                  icon='fa fa-ellipsis-v rich-button'
                  items={items}
                  title='Show more'
                />
              </div>
            </div>
          </div>
        </div>

        <ul className='stpack__stickers'>
          {
            stpack.get('stickers').size && stpack.get('stickers').map(stickerId => (
              <li className='stpack__sticker' key={stickerId}>
                <StickerContainer stickerId={stickerId} />
              </li>
            ))
          }
        </ul>
      </article>
    );
  }

}
