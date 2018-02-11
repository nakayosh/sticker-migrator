import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, defineMessages } from 'react-intl';
import IconButton from '@/components/icon_button';

const messages = defineMessages({
  submit: { id: 'wizard.submit', defaultMessage: 'Create' },
  input: { id: 'wizard.description', defaultMessage: 'Input LINE STORE\'s URL to migrate sticker to Telegram. If it already exists, redirect to the download page.' },
});

export default class Wizard extends React.PureComponent {

  static propTypes = {
    intl: PropTypes.object.isRequired,
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

  handleKeyDown = e => {
    switch(e.key) {
    case 'Enter':
      this.props.onSubmit(this.state.value);
      break;
    case 'Escape':
      e.currentTarget.blur();
      break;
    }
  }

  render () {
    const { intl } = this.props;

    return (
      <div className='wizard module'>
        <h2 className='module__title'>
          <FormattedMessage id='wizard.title' defaultMessage='Create new sticker set' />
        </h2>

        <div className='wizard__form'>
          <input
            className='wizard__input rich-input input'
            type='text'
            pattern='https:\/\/store\.line\.me\/stickershop\/product\/[0-9]+?(\/.*)*'
            placeholder='https://store.line.me/stickershop/product/3897'
            title={intl.formatMessage(messages.input)}
            aria-label={intl.formatMessage(messages.input)}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />

          <IconButton
            className='wizard__submit rich-button button'
            icon='fa fa-download'
            title={intl.formatMessage(messages.submit)}
            onClick={this.handleSubmit}
          />
        </div>
      </div>
    );
  }

}
