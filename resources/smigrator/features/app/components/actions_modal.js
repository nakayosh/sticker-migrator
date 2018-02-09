import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ActionsModal extends React.PureComponent {

  static propTypes = {
    actions: PropTypes.array,
    onClick: PropTypes.func,
  }

  renderAction = (action, i)  => {
    if (action === null) {
      return <li key={`sep-${i}`} className='actions-modal__sep' />;
    }

    const { text, href = '#' } = action;

    return (
      <li className='actions-modal__list-item' key={`${text}-${i}`}>
        <Link to={href} className='actions-modal__link' target='_blank' rel='noopener' role='button' tabIndex='0' autoFocus={i === 0} onClick={this.handleClick} data-index={i}>
          {text}
        </Link>
      </li>
    );
  }

  render () {
    return (
      <div className='modal-root__modal actions-modal'>
        {status}

        <ul className='actions-modal__list'>
          {this.props.actions.map(this.renderAction)}
        </ul>
      </div>
    );
  }

}
