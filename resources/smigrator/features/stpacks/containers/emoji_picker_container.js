import { connect } from 'react-redux';
import {
  expandEmojiPicker,
  closeEmojiPicker,
} from '@/actions/emoji_picker';
import EmojiPicker from '@/features/stpacks/components/emoji_picker';

const mapStateToProps = state => ({
  expanded: state.getIn(['emoji_picker', 'expanded']),
  currentId: state.getIn(['emoji_picker', 'currentId']),
});

const mapDispatchToProps = dispatch => ({

  onExpand(id) {
    dispatch(expandEmojiPicker(id));
  },

  onClose() {
    dispatch(closeEmojiPicker());
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmojiPicker);
