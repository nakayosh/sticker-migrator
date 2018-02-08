import React from 'react';
import Page from '@/features/app/components/page';
import Content from '@/features/app/components/content';
import GeneralHeader from '@/features/general_header';
import SearchStpacks from '@/containers/search_stpacks_container';
import SearchForm from '@/containers/search_form_container';

export default class MobileHome extends React.PureComponent {

  render () {
    return (
      <Page>
        <GeneralHeader />

        <Content>
          <SearchForm />
          <SearchStpacks />
        </Content>
      </Page>
    );
  }

}
