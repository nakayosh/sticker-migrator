import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '../components/icon_button';

export default class SearchForm extends React.PureComponent {

  static propTypes = {
    value: PropTypes.string.isRequired,
    submitted: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
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
    const { value, submitted } = this.props;

    return (
      <div className='search-form'>
        <input
          className='search-form__input rich-input input'
          ref={this.setRef}
          type='text'
          value={value}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />

        <IconButton
          className='search-form__button'
          icon={submitted ? 'fa fa-times' : 'fa fa-search'}
          title={submitted ? 'Click to clear result' : 'Seach with Keyword'}
          onClick={submitted ? this.handleClear : () => this.node.focus()}
        />
      </div>
    );
  }

}
