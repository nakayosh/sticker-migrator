import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { ScrollContainer } from 'react-router-scroll-4';
import { FormattedMessage } from 'react-intl';

import CompactStpack from '../containers/compact_stpack_container';
import LoadingIndicator from '../components/loading_indicator';

export default class RecentStpacks extends ImmutablePureComponent {

  static propTypes = {
    results: ImmutablePropTypes.list,
    isSubmitting: PropTypes.bool.isRequired,
  }

  componentWillMount() {
    if ( !this.props.results.size ) {
      this.props.onScroll();
    }
  }

  handleScroll = e => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    if (scrollTop === scrollHeight - clientHeight && !this.props.isSubmitting) {
      this.props.onScroll();
    }
  }

  render () {
    const { results } = this.props;

    return (
      <div className='recent-stpacks'>
        {
          results.size ? (
            <ScrollContainer scrollKey='recent'>
              <div className='recent-stpacks__scroll-container' onScroll={this.handleScroll}>
                { results.map(result => <CompactStpack id={result} key={result} />) }
                <LoadingIndicator />
              </div>
            </ScrollContainer>
          ) : (
            <LoadingIndicator />
          )
        }
      </div>
    );
  }

}
