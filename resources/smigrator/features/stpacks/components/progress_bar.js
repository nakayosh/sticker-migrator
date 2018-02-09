import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { FormattedMessage } from 'react-intl';
import Motion from 'react-motion/lib/Motion';
import spring from 'react-motion/lib/spring';

import { COMPILING, UPLOADING, FAILED } from '@/features/stpacks/util/constants';

export default class ProgressBar extends ImmutablePureComponent {

  static propTypes = {
    stpack: ImmutablePropTypes.map,
  }

  state = {
    numer: 12,
    denom: 0,
  }

  componentWillMount () {
    if ( this.props.stpack ) {
      // Count of sickers × 2 for upload and compile
      this.setState({ denom: this.props.stpack.get('stickers').size * 2 });
    }
  }

  componentWillReceiveProps (nextProps) {
    if ( nextProps.stpack.get('status') !== FAILED ) {
      // In case of compilie alredy starting
      if ( nextProps.stpack.get('compiled_stickers_count') > 0 ) {
        this.setState({ numer: nextProps.stpack.get('compiled_stickers_count') });

      // In case of upload alredy starting, add sum of stickers
      } else if ( nextProps.stpack.get('uploaded_stickers_count') > 0 ) {
        this.setState({ numer: this.props.stpack.get('stickers').size + nextProps.stpack.get('uploaded_stickers_count') });
      }
    }
  }

  render () {
    const { stpack } = this.props;
    const percentage = Math.round((this.state.numer / this.state.denom) * 100);

    if (!stpack) {
      return null;
    }

    let message;

    if ( stpack.get('status') === COMPILING ) {
      message = <FormattedMessage id='stpack.progress.compiling' defaultMessage='Compiling stickers... {percentage}%' values={{ percentage }} />;
    } else if ( stpack.get('status') === UPLOADING ) {
      message = <FormattedMessage id='stpack.progress.uploading' defaultMessage='Uploading stickers... {percentage}%' values={{ percentage }} />;
    } else {
      message = <FormattedMessage id='stpack.progress.failed' defaultMessage='Failed to migration :(' />;
    }

    return (
      <div className='stpack-progress-bar'>
        { message }

        <Motion defaultStyle={{ width: 0 }} style={{ width: spring(percentage) }}>
          {({ width }) =>
            <div className='stpack-progress-bar__tracker' style={{ width: `${width}%` }} />
          }
        </Motion>
      </div>
    );
  }

}
