import React from 'react';
import { FormattedMessage } from 'react-intl';

const onReload = () => window.location.reload();

const Failed = () => {
  return (
    <div class='stpack stpack-failed'>
      <h3 className='stpack-failed__text'>
        <i className='fa fa-exclamation-triangle' aria-hidden />
        <FormattedMessage id='stpack.progress.failed' defaultMessage='Failed to migration :(' />
      </h3>

      <p className='stpack-failed__description'>
        <FormattedMessage id='stpack.progress.failed_description' defaultMessage='aaa' />
      </p>

      <button className='stpack-failed__retry rich-button button' onClick={onReload}>
        <FormattedMessage id='stpack.progress.retry' defaultMessage='Retry' />
      </button>
    </div>
  );
};

export default Failed;
