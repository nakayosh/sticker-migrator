import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { Link } from 'react-router-dom';
import { FormattedDate } from 'react-intl';

export default class CompactStpack extends ImmutablePureComponent {

  static propTypes = {
    stpack: ImmutablePropTypes.map,
  }

  render () {
    const { stpack } = this.props;

    if ( !stpack ) {
      return null;
    }

    return (
      <div className='compact-stpack'>
        <Link to={`/stpacks/${stpack.get('id_str')}`}>
          <div className='compact-stpack__thumbnail'>
            <img src={stpack.get('thumbnail_url')} alt={stpack.get('name')} />
          </div>

          <div className='compact-stpack__meta'>

            <h3 className='compact-stpack__title'>
              {stpack.get('name')}
            </h3>

            <time className='stpack__time' timestamp={stpack.get('created_at')}>
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

          </div>
        </Link>
      </div>
    );
  }

}
