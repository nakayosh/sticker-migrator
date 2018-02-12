import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import Overlay from 'react-overlays/lib/Overlay';
import { Picker } from 'emoji-mart';
import detectPassiveEvents from 'detect-passive-events';
import { isMobile } from '@/is_mobile';

const listenerOptions = detectPassiveEvents.hasSupport ? { passive: true } : false;

const messages = defineMessages({
  emoji: { id: 'emoji_button.label', defaultMessage: 'Insert emoji' },
  emoji_search: { id: 'emoji_button.search', defaultMessage: 'Search...' },
  emoji_not_found: { id: 'emoji_button.not_found', defaultMessage: 'No emojis found' },
  custom: { id: 'emoji_button.custom', defaultMessage: 'Custom' },
  recent: { id: 'emoji_button.recent', defaultMessage: 'Frequently used' },
  search_results: { id: 'emoji_button.search_results', defaultMessage: 'Search results' },
  people: { id: 'emoji_button.people', defaultMessage: 'People' },
  nature: { id: 'emoji_button.nature', defaultMessage: 'Nature' },
  food: { id: 'emoji_button.food', defaultMessage: 'Food & Drink' },
  activity: { id: 'emoji_button.activity', defaultMessage: 'Activity' },
  travel: { id: 'emoji_button.travel', defaultMessage: 'Travel & Places' },
  objects: { id: 'emoji_button.objects', defaultMessage: 'Objects' },
  symbols: { id: 'emoji_button.symbols', defaultMessage: 'Symbols' },
  flags: { id: 'emoji_button.flags', defaultMessage: 'Flags' },
});

@injectIntl
export class EmojiPickerInner extends React.PureComponent {

  static propTypes = {
    intl: PropTypes.object.isRequired,
    style: PropTypes.object,
    currentId: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onAppend: PropTypes.func.isRequired,
  }

  static defaultProps = {
    style: {},
  }

  componentDidMount () {
    if (isMobile(window.innerWidth)) {
      document.addEventListener('touchend', this.handleDocumentClick, listenerOptions);
    } else {
      document.addEventListener('click', this.handleDocumentClick, false);
    }
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, listenerOptions);
  }

  handleDocumentClick = e => {
    if ( (this.node && !this.node.contains(e.target)) && !e.target.classList.contains('compose-selector__expand') ) {
      this.props.onClose();
    }
  }

  handleAppend = emoji => {
    const { currentId } = this.props;
    const { native } = emoji;

    if ( currentId && native ) {
      this.props.onAppend(currentId, native);
      this.props.onClose();
    }
  }

  getI18n = () => {
    const { intl } = this.props;

    return {
      search: intl.formatMessage(messages.emoji_search),
      notfound: intl.formatMessage(messages.emoji_not_found),
      categories: {
        search: intl.formatMessage(messages.search_results),
        recent: intl.formatMessage(messages.recent),
        people: intl.formatMessage(messages.people),
        nature: intl.formatMessage(messages.nature),
        foods: intl.formatMessage(messages.food),
        activity: intl.formatMessage(messages.activity),
        places: intl.formatMessage(messages.travel),
        objects: intl.formatMessage(messages.objects),
        symbols: intl.formatMessage(messages.symbols),
        flags: intl.formatMessage(messages.flags),
        custom: intl.formatMessage(messages.custom),
      },
    };
  }

  setRef = c => {
    this.node = c;
  }

  render () {
    // We need to set reference to container of the picker
    // but <Picker /> component won't apply ref attribute on it, so wrap it on <div />
    // But in case wrapped it, next we need to specify the value
    // of width and height of picker for overlay component
    // so following code are specifing them constantly

    const PICKER_WIDTH  = 338;
    const PICKER_HEIGHT = 354;

    const style = {
      position: 'absolute',
      margin: 'auto',
      width: `${PICKER_WIDTH}px`,
      height: `${PICKER_HEIGHT}px`,
      ...this.props.style,
    };

    return (
      <div style={style} ref={this.setRef}>
        <Picker
          set='apple'
          color=''
          i18n={this.getI18n()}
          showPreview={false}
          onClick={this.handleAppend}
          emojiTooltip
        />
      </div>
    );
  }

}

export default class EmojiPicker extends React.PureComponent {

  static propTypes = {
    expanded: PropTypes.bool.isRequired,
    currentId: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onAppend: PropTypes.func.isRequired,
  }

  render () {
    const { expanded, currentId } = this.props;

    const target    = document.querySelector(`.compose-selector[data-sticker-id="${currentId}"]`);
    const placement = target && document.body.clientHeight - target.offsetTop - target.offsetHeight < 400 ? 'top' : 'bottom';

    return (
      <Overlay show={expanded} placement={placement} target={target}>
        <EmojiPickerInner
          currentId={currentId}
          onClose={this.props.onClose}
          onAppend={this.props.onAppend}
        />
      </Overlay>
    );
  }

}
