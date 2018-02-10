import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { ScrollContainer } from 'react-router-scroll-4';
import { FormattedMessage } from 'react-intl';

import CompactStpack from '@/containers/compact_stpack_container';
import LoadingIndicator from '@/components/loading_indicator';

export default class RecentStpacks extends ImmutablePureComponent {

  static propTypes = {
    results: ImmutablePropTypes.list,
    hasMore: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
  }

  componentWillMount() {
    if ( !this.props.results.size ) {
      this.props.onRefresh();
    }
  }

  handleScroll = e => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    if (scrollTop === scrollHeight - clientHeight && !this.props.submitting && this.props.hasMore) {
      this.props.onExpand();
    }
  }

  render () {
    const { results, hasMore } = this.props;

    return (
      <div className='module'>
        <header className='module__header'>
          <h2 className='module__title'>
            <FormattedMessage id='recent_stpacks.title' defaultMessage='Recently added sticker sets' />
          </h2>
        </header>

        <div className='module-scrollable-content'>
          {
            !!results.size ? (
              <ScrollContainer scrollKey='recent'>
                <div className='module-scrollable-content__inner' onScroll={this.handleScroll}>
                  { results.map((result, i) => <CompactStpack id={result} key={result} aria-posinset={i+1} aria-setsize={results.size} />) }
                  { hasMore && <LoadingIndicator /> }
                </div>
              </ScrollContainer>
            ) : (
              <LoadingIndicator />
            )
          }
        </div>
      </div>
    );
  }

}
