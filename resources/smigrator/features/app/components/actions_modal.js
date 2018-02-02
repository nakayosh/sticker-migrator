import React from 'react';
import PropTypes from 'prop-types';

export default class ActionsModal extends React.PureComponent {

  static propTypes = {
    actions: PropTypes.array,
    onClick: PropTypes.func,
  }

  renderAction = (action, i)  => {
    if (action === null) {
      return <li key={`sep-${i}`} className='dropdown-menu__sep' />;
    }

    const { text, href = '#' } = action;

    return (
      <li className='dropdown-menu__list-item' key={`${text}-${i}`}>
        <a href={href} target='_blank' rel='noopener' role='button' tabIndex='0' autoFocus={i === 0} onClick={this.handleClick} data-index={i}>
          {text}
        </a>
      </li>
    );
  }

  render () {
    return (
      <div className='modal-root__modal actions-modal'>
        {status}

        <ul className='dropdown-menu__list'>
          {this.props.actions.map(this.renderAction)}
        </ul>
      </div>
    );
  }

}
