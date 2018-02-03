import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { ScrollContainer } from 'react-router-scroll-4';
import { FormattedMessage } from 'react-intl';

import CompactStpack from '../../containers/compact_stpack_container';
import LoadingIndicator from '../../components/loading_indicator';

const mapStateToProps = state => ({
  value: state.getIn(['search_stpacks', 'value']),
  results: state.getIn(['search_stpacks', 'results']),
  submitted: state.getIn(['search_stpacks', 'submitted']),
});

@connect(mapStateToProps)
export default class SearchStpacks extends ImmutablePureComponent {

  static propTypes = {
    value: PropTypes.string.isRequired,
    results: ImmutablePropTypes.list,
    submitted: PropTypes.bool.isRequired,
  }

  handleScroll = e => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    if (scrollTop === scrollHeight - clientHeight) {
      this.props.onScroll();
    }
  }

  render () {
    const { value, results, submitted } = this.props;

    return (
      <div className='module'>
        <header className='module__header'>
          <h2 className='module__title'>
            <FormattedMessage id='search_stpacks.title' defaultMessage='Search results for "{query}"' values={{ query: value }} />
          </h2>
        </header>

        <div className='module-scrollable-content'>
          {
            submitted && !!results.size && (
              <ScrollContainer scrollKey='search'>
                <div className='module-scrollable-content__inner' onScroll={this.handleScroll}>
                  { results.map(result => <CompactStpack id={result} key={result} />) }
                  <LoadingIndicator />
                </div>
              </ScrollContainer>
            )
          }

          {
            submitted && !results.size && (
              <p className='module-scrollable-content__empty'>
                <FormattedMessage id='search_stpacks.empty' values={{ line_store: <a href={`https://store.line.me/search?q=${ encodeURIComponent(value) }`} target='_blank'>{ value }</a> }} />
              </p>
            )
          }

          {
            !submitted && value !== '' && <LoadingIndicator />
          }
        </div>
      </div>
    );
  }

}
