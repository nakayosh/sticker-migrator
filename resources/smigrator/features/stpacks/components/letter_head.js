import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { Link } from 'react-router-dom';
import { FormattedMessage, FormattedDate, defineMessages, injectIntl } from 'react-intl';
import Dropdown from '@/containers/dropdown_container';

import { UPLOADED } from '@/features/stpacks/util/constants';

const messages = defineMessages({
  visit_original: { id: 'stpack.visit_original', defualtMessage: 'Visit original' },
  share_line: { id: 'stpack.share_line', defualtMessage: 'Share with LINE' },
  share_telegram: { id: 'stpack.share_telegram', defualtMessage: 'Share with Telegram' },
});

@injectIntl
export default class LetterHead extends ImmutablePureComponent {

  static propTypes = {
    intl: PropTypes.object.isRequired,
    stpack: ImmutablePropTypes.map,
  }

  render () {
    const { stpack, intl } = this.props;

    const items = [
      { text: intl.formatMessage(messages.visit_original), href: stpack.get('original_url') },
      { text: intl.formatMessage(messages.share_line),     href: `https://lineit.line.me/share/ui?url=${ window.location.href }` },
      { text: intl.formatMessage(messages.share_telegram), href: `https://t.me/share/url?url=${ window.location.href }` },
    ];

    if ( !stpack ) {
      return null;
    }

    return (
      <div className='stpack-letter-head'>
        <div className='stpack-letter-head__thumbnail'>
          <img src={stpack.get('thumbnail_url')} alt={stpack.get('name')} />
        </div>

        <div className='stpack-letter-head__meta'>
          <time className='stpack-letter-head__time' timestamp={stpack.get('created_at')}>
            <i className='fa fa-clock-o' aria-hidden />

            <FormattedDate
              value={new Date(stpack.get('created_at'))}
              hour12={false}
              year='numeric'
              month='short'
              day='2-digit'
              hour='2-digit'
              minute='2-digit'
            />
          </time>

          <h2 className='stpack-letter-head__title'>
            <Link to={`/stpacks/${stpack.get('id_str')}`}>
              { stpack.get('name') }
            </Link>
          </h2>

          <div className='stpack-letter-head__buttons-wrapper'>
            <div className='stpack-letter-head__download-button'>
              <a className='rich-button' href={stpack.get('url')} target='_blank' disabled={stpack.get('status') !== UPLOADED} onClick={this.handleDownload}>
                <i className='fa fa-plus' />
                <FormattedMessage id='stpack.add' defaultMessage='Add on Telegram' />
              </a>
            </div>

            <div className='stpack-letter-head__dropdown-menu'>
              <Dropdown
                className='rich-button'
                icon='fa fa-ellipsis-v'
                items={items}
                title='Show more'
                disabled={stpack.get('status') !== UPLOADED}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

}
