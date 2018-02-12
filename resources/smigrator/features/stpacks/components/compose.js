import React from 'react';
import PropTypes from 'prop-types';
import ImmtuablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import LetterHead from '@/features/stpacks/components/letter_head';
import ComposeSelector from '@/containers/compose_selector_container';
import { FormattedMessage } from 'react-intl';
import EmojiPicker from '@/features/stpacks/containers/emoji_picker_container';
import EmojiPickerMobile from '@/features/stpacks/containers/emoji_picker_mobile_container';
import { isMobile } from '@/is_mobile';

export class PublishButton extends React.PureComponent {

  static propTypes = {
    submittable: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  render () {
    const { submittable, submitting } = this.props;
    let icon, message;

    if (submittable && !submitting) {
      icon    = <i className='fa fa-paint-brush' aria-hidden />;
      message = <FormattedMessage id='compose.publish' defaultMessage='Publish' />;
    } else if (submitting) {
      icon    = <i className='fa fa-spin fa-spinner' aria-hidden='true' />;
      message = <FormattedMessage id='compose.requesting' defaultMessage='Requesting...' />;
    } else {
      icon    = null;
      message = <FormattedMessage id='compose.specify_emojis' defaultMessage='Specify emoijs' />;
    }

    return (
      <div className='compose__button'>
        <button className='rich-button button' disabled={!submittable || submitting} title={message} aria-label={message} onClick={this.props.onClick}>
          { icon }
          { message }
        </button>
      </div>
    );
  }

}

export default class Compose extends ImmutablePureComponent {

  static propTypes = {
    intl: PropTypes.object.isRequired,
    currentId: PropTypes.string,
    stpack: ImmtuablePropTypes.map,
    stickers: ImmtuablePropTypes.list,
    submitting: PropTypes.bool.isRequired,
    onAppend: PropTypes.func.isRequired,
  }

  state = {
    submittable: false,
  }

  shouldComponentUpdate (nextProps) {
    if ( this.props.stickers.map(sticker => sticker.get('emojis').size) !== nextProps.stickers.map(sticker => sticker.get('emojis').size) ) {
      return true;
    }

    return false;
  }

  componentWillReceiveProps (nextProps) {
    if ( !this.props.submitting && this.props.stpack.get('stickers').size === nextProps.stickers.filter(sticker => sticker.get('emojis').size > 0 ).size ) {
      this.setState({ submittable: true });
    } else if ( this.props.submitting || this.state.submittable) {
      this.setState({ submittable: false });
    }
  }

  handlePatch = e => {
    e.preventDefault();

    if (this.state.submittable) {
      this.props.onPatch();
    }
  }

  renderItem (stickerId, i) {
    const { stpack } = this.props;

    return (
      <li className='compose__sticker' key={stickerId} aria-posinset={i+1} aria-setsize={stpack.get('stickers').size}>
        <ComposeSelector stickerId={stickerId} />
      </li>
    );
  }

  render () {
    const { submittable } = this.state;
    const { stpack, submitting } = this.props;

    if (!stpack) {
      return null;
    }

    return (
      <div className='compose'>
        <LetterHead stpack={stpack} />

        <div className='compose__description'>
          <FormattedMessage id='compose.description' defaultMessage='This sticker set has not migrated to Telegram. Click following stickers to specify emoij and then publish to Telegram!' />
        </div>

        <ul className='compose__stickers'>
          { stpack.get('stickers').map((stickerId, i) => this.renderItem(stickerId, i)) }
        </ul>

        <PublishButton
          submitting={submitting}
          submittable={submittable}
          onClick={this.handlePatch}
        />

        {
          isMobile(window.innerWidth) ? (
            <EmojiPickerMobile onAppend={this.props.onAppend} />
          ) : (
            <EmojiPicker onAppend={this.props.onAppend} />
          )
        }
      </div>
    );
  }

}
