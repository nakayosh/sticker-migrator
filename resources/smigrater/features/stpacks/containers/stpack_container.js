import { connect } from 'react-redux';
import { Map as ImmutableMap } from 'immutable';
import Stpack from '../components/stpack';

const mapStateToProps = () => ({
  stpack: ImmutableMap({
    name:          'アイドルマスターシンデレラガールズ',
    short_name:    '3897',
    thumbnail_url: 'https://stickershop.line-scdn.net/stickershop/v1/product/3897/LINEStorePC/main@2x.png;compress=true?__=20161019',
    url:           'https://t.me/addstickers/mikunyannyan2',
    original_url:  'https://store.line.me/stickershop/product/3897/ja',
    created_at:    '2018-01-29T05:46:50.306Z',
  }),
});

export default connect(
  mapStateToProps,
)(Stpack);
