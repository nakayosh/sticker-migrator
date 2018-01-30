import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import BundleContainer from '../containers/bundle_container';
import PageError from '../components/page_error';
import PageLoading from '../components/page_loading';

export class WrappedRoute extends React.Component {

  static propTypes = {
    content: PropTypes.node,
    component: PropTypes.func.isRequired,
  }

  renderComponent = ({ match }) => {
    const { component, content } = this.props;

    return (
      <BundleContainer fetchComponent={component} loading={this.renderLoading} error={this.renderError}>
        {Component => <Component match={match}>{content}</Component>}
      </BundleContainer>
    );
  }

  renderLoading = () => {
    return <PageLoading />;
  }

  renderError = (props) => {
    return <PageError {...props} />;
  }

  render () {
    const { component: Component, content, ...rest } = this.props;

    return <Route {...rest} render={this.renderComponent} />;
  }

}
