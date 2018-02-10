import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { ScrollContainer } from 'react-router-scroll-4';
import { FormattedMessage } from 'react-intl';

import CompactStpack from '@/containers/compact_stpack_container';
import LoadingIndicator from '@/components/loading_indicator';

export default class SearchStpacks extends ImmutablePureComponent {

  static propTypes = {
    value: PropTypes.string.isRequired,
    results: ImmutablePropTypes.list,
    hasMore: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
  }

  handleScroll = e => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    if (scrollTop === scrollHeight - clientHeight && this.props.hasMore && !this.props.submitting ) {
      this.props.onScroll();
    }
  }

  render () {
    const { value, results, submitting, hasMore } = this.props;

    return (
      <div className='module'>

        <header className='module__header'>
          <h2 className='module__title'>
            <FormattedMessage id='search_stpacks.title' defaultMessage='Search results for "{query}"' values={{ query: value }} />
          </h2>
        </header>

        <div className='module-scrollable-content'>
          {
            !submitting && !!results.size && (
              <ScrollContainer scrollKey='search'>
                <div className='module-scrollable-content__inner' onScroll={this.handleScroll}>
                  { results.map((result, i) => <CompactStpack id={result} key={result} aria-posinset={i+1} aria-setsize={results.size} />) }
                  { hasMore && <LoadingIndicator /> }
                </div>
              </ScrollContainer>
            )
          }

          {
            !submitting && !results.size && (
              <p className='module-scrollable-content__empty'>
                <FormattedMessage id='search_stpacks.empty' values={{ line_store: <a href={`https://store.line.me/search?q=${ encodeURIComponent(value) }`} target='_blank'>{ value }</a> }} />
              </p>
            )
          }

          {
            hasMore && submitting && value !== '' && <LoadingIndicator />
          }
        </div>
      </div>
    );
  }

}
