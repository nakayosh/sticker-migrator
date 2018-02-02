import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Page from '../app/components/page';
import Content from '../app/components/content';

import GeneralHeader from '../general_header';
import SearchForm from '../../containers/search_form_container';
import SearchStpacks from '../../containers/search_stpacks_container';

const mapStateToProps = state => ({
  value: state.getIn(['search_stpacks', 'value']),
});

@connect(mapStateToProps)
export default class Recent extends React.PureComponent {

  static propTypes = {
    value: PropTypes.string.isRequired,
  }

  render () {
    const { value } = this.props;

    return (
      <Page>
        <GeneralHeader />

        <Content>
          <SearchForm />

          <div className='discover-stpacks'>
            <header className='discover-stpacks__header'>
              <h2 className='discover-stpacks__title'>
                {!!value && `Search results for "${value}"`}
              </h2>
            </header>

            <SearchStpacks />
          </div>
        </Content>
      </Page>
    );
  }

}
