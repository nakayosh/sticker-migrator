import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router';
import { WrappedRoute } from './util/react_router_helpers';
import { ImmutableLoadingBar as LoadingBar } from 'react-redux-loading-bar';
import ModalContaienr from './containers/modal_container';
import { isMobile } from '../../is_mobile';
import MobileMenu from '../mobile_menu';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ja from 'react-intl/locale-data/ja';

// Async components
import {
  Home,
  Stpacks,
  Compose,
  MobileHome,
  MobileRecentStpacks,
  MobileSearchStpacks,
} from './util/async-components';

addLocaleData([...en, ...ja]);
const messages = require.context('../../../locales/', false, /\.json$/);
const messagesForLocale = locale => messages(`./${locale}.json`);

const mapStateToProps = state => ({
  locale: state.getIn(['settings', 'locale']),
});

@connect(mapStateToProps)
export default class App extends React.Component {

  static propTypes = {
    locale: PropTypes.string.isRequired,
  }

  render() {
    const { locale } = this.props;

    return (
      <IntlProvider locale={locale} messages={messagesForLocale(locale)}>
        <div className='app' ref={this.setRef}>
          <Switch>
            <Redirect exact from='/' to='/home' />

            <WrappedRoute path='/home' component={isMobile(window.innerWidth) ? MobileHome : Home} />
            <WrappedRoute path='/recent' component={MobileRecentStpacks} />
            <WrappedRoute path='/search' component={MobileSearchStpacks} />

            <WrappedRoute path='/stpacks/:id' component={Stpacks} />
            <WrappedRoute path='/stpacks/:id/compose' component={Compose} />
          </Switch>

          <ModalContaienr />
          { isMobile(window.innerWidth) && <MobileMenu location={{ ...window.location }} /> }

          <LoadingBar className='loading-bar' />
        </div>
      </IntlProvider>
    );
  }

}
