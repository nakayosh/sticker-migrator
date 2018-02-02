import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';

import CompactStpackContainer from '../containers/compact_stpack_container';
import LoadingIndicator from '../components/loading_indicator';

export default class RecentStpacks extends ImmutablePureComponent {

  static propTypes = {
    results: ImmutablePropTypes.list,
    isSubmitting: PropTypes.bool.isRequired,
  }

  render () {
    const { results, isSubmitting } = this.props;

    if ( results === null) {
      return (
        <div className='recent-stpacks'>
          <LoadingIndicator />
        </div>
      );
    }

    return (
      <div className='recent-stpacks'>
        {
          results.map(result => <CompactStpackContainer id={result} />)
        }
      </div>
    );
  }

}
