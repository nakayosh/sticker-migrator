import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';

export default class ProgressBar extends ImmutablePureComponent {

  static propTypes = {
    stpack: ImmutablePropTypes.map,
  }

  state = {
    numer: 0,
    denom: 0,
  }

  componentWillMount () {
    if ( this.props.stpack ) {
      // Count of sickers × 2 for upload and compile
      this.setState({ denom: this.props.stpack.get('stickers') * 2 });
    }
  }

  componentWillReceiveProps (nextProps) {
    if ( nextProps.stpack.get('status') !== 4 ) {
      // In case of compilie alredy starting
      if ( nextProps.stpack.get('compiled_stickers_count') > 0 ) {
        this.setState({ numer: nextProps.stpack.get('compiled_stickers_count') });

      // In case of upload alredy starting, add sum of stickers
      } else if ( nextProps.stpack.get('uploaded_stickers_count') > 0 ) {
        this.setState({ numer: this.props.stpack.get('stickers') + nextProps.stpack.get('uploaded_stickers_count') });
      }
    }
  }

  render () {
    const { numer, denom } = this.state;
    const { stpack } = this.props;

    if (!stpack) {
      return null;
    }

    return (
      <p>
        { numer } / { denom }
      </p>
    );
  }

}
