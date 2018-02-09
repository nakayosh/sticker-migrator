import React from 'react';
import Page from '@/features/app/components/page';
import Content from '@/features/app/components/content';
import GeneralHeader from '@/features/general_header';
import SearchStpacksContainer from '@/features/search_stpacks/containers/search_stpacks_container';
import SearchForm from '@/features/search_stpacks/containers/search_form_container';

export default class SearchStpacks extends React.PureComponent {

  render () {
    return (
      <Page>
        <GeneralHeader />

        <Content>
          <SearchForm />
          <SearchStpacksContainer />
        </Content>
      </Page>
    );
  }

}
