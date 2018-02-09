import React from 'react';
import LoadingIndicator from '@/components/loading_indicator';

export default class PageLoading extends React.PureComponent {

  render () {
    return (
      <div className='page-loading'>
        <LoadingIndicator />
      </div>
    );
  }

}
