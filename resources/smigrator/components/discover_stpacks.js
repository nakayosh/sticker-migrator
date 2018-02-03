import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePureComponent from 'react-immutable-pure-component';
import classNames from 'classnames';
import { FormattedMessage, defineMessages } from 'react-intl';

import IconButton from '../components/icon_button';
import SearchStpacksContainer from '../containers/search_stpacks_container';
import RecentStpacksContainer from '../containers/recent_stpacks_container';

const messages = defineMessages({
  placeholder: { id: 'search_stpacks.placeholder', defaultMessage: 'Type your keyword' },
  submit: { id: 'search_stpacks.submit', defaultMessage: 'Search' },
  clear: { id: 'search_stpacks.clear', defaultMessage: 'Clear' },
});

export default class DiscoverStpacks extends ImmutablePureComponent {

  static propTypes = {
    intl: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    submitted: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
  }

  state = {
    searchFocused: false,
    searchExpanded: false,
  }

  handleChange = e => {
    const value = e.currentTarget.value;
    this.props.onChange(value);

    if ( value ) {
      this.setState({ searchExpanded: true });
    } else {
      this.setState({ searchExpanded: false });
    }
  }

  handleClear = e => {
    e.preventDefault();

    this.setState({ searchExpanded: false });
    this.props.onClear();
  }

  handleKeyDown = e => {
    switch(e.key) {
    case 'Enter':
    case 'Escape':
      e.currentTarget.blur();
      break;
    }
  }

  handleFocus = () => {
    this.setState({ searchFocused: true });
  }

  handleBlur = () => {
    this.setState({ searchFocused: false });
  }

  setRef = c => {
    this.node = c;
  }

  render () {
    const { searchExpanded, searchFocused } = this.state;
    const { intl, value, submitted } = this.props;

    return (
      <div className='discover-stpacks'>
        <header className={classNames('discover-stpacks__header', { 'discover-stpacks__header--focused' : searchFocused })}>
          <h2 className='discover-stpacks__title'>
            {
              searchExpanded ? (
                <FormattedMessage id='search_stpacks.title' defaultMessage='Search results for "{query}"' values={{ query: value }} />
              ) : (
                <FormattedMessage id='recent_stpacks.title' defaultMessage='Recently added sticker sets' />
              )
            }
          </h2>

          <div className='discover-stpacks__input-wrapper'>
            <input
              className='discover-stpacks__input rich-input input'
              ref={this.setRef}
              type='text'
              value={value}
              placeholder={intl.formatMessage(messages.placeholder)}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />

            <IconButton
              className='discover-stpacks__button'
              icon={submitted ? 'fa fa-times' : 'fa fa-search'}
              title={submitted ? intl.formatMessage(messages.clear) : intl.formatMessage(messages.submit)}
              onClick={submitted ? this.handleClear : () => this.node.focus()}
            />
          </div>
        </header>

        {
          searchExpanded ? (
            <SearchStpacksContainer />
          ) : (
            <RecentStpacksContainer />
          )
        }
      </div>
    );
  }

}
