import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { ScrollContainer } from 'react-router-scroll-4';

import CompactStpack from '../containers/compact_stpack_container';
import LoadingIndicator from '../components/loading_indicator';

export default class SearchStpacks extends ImmutablePureComponent {

  static propTypes = {
    results: ImmutablePropTypes.list,
    submitted: PropTypes.bool.isRequired,
  }

  // componentWillMount() {
  //   if ( !this.props.results.size ) {
  //     this.props.onScroll();
  //   }
  // }

  handleScroll = e => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    if (scrollTop === scrollHeight - clientHeight) {
      this.props.onScroll();
    }
  }

  render () {
    const { results, submitted } = this.props;

    return (
      <div className='search-stpacks'>
        {
          submitted && results.size ? (
            <ScrollContainer scrollKey='search'>
              <div className='search-stpacks__scroll-container' onScroll={this.handleScroll}>
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
