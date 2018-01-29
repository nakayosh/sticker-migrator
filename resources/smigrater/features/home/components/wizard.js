import React from 'react';
import PropTypes from 'prop-types';

export default class Wizard extends React.PureComponent {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  state = {
    value: '',
  }

  handleChange = e => {
    this.setState({ value: e.currentTarget.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
  }

  render () {
    return (
      <div className='wizard'>
        <h2>
          Create a new pack
        </h2>

        <div className='wizard__form'>
          <input
            className='wizard__input input'
            type='text'
            pattern='https:\/\/store\.line\.me\/stickershop\/product\/[0-9]+'
            placeholder='https://store.line.me/stickershop/product/3897'
            onChange={this.handleChange}
          />

          <button className='wizard__submit button' onClick={this.handleSubmit}>
            <i className='fa fa-download' aria-hidden />
          </button>
        </div>
      </div>
    );
  }

}
