import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import Stpack from '@/features/stpacks/components/stickers';

export default injectIntl(connect()(Stpack));
