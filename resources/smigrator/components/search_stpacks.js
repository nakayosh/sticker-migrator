import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { ScrollContainer } from 'react-router-scroll-4';

import CompactStpack from '../containers/compact_stpack_container';
import LoadingIndicator from '../components/loading_indicator';

export default class SearchStpacks extends ImmutablePureComponent {

  static propTypes = {
    value: PropTypes.string.isRequired,
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
    const { value, results, submitted } = this.props;

    return (
      <div className='search-stpacks'>
        {
          submitted && !!results.size && (
            <ScrollContainer scrollKey='search'>
              <div className='search-stpacks__scroll-container' onScroll={this.handleScroll}>
                { results.map(result => <CompactStpack id={result} key={result} />) }
                <LoadingIndicator />
              </div>
            </ScrollContainer>
          )
        }

        {
          submitted && !results.size && (
            <p className='search-stpacks__empty'>
              Sorry, there is nothing such sticker yet,<br />
              If you'd like, you can search <a href={`https://store.line.me/search?q=${ encodeURIComponent(value) }`} target='_blank'>{ value }</a> in the original Web site.
            </p>
          )
        }

        {
          !submitted && value !== '' && <LoadingIndicator />
        }
      </div>
    );
  }

}
