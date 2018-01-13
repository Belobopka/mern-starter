import { COMMENT_INFO } from './PostActions';

const initialMessageState = { commentEditToggle: false, commentcuid: '', commentAuthor: '' };
const MessageEditReducer = (state = initialMessageState, action) => {
  switch (action.type) {
    case COMMENT_INFO :
      return {
        commentEditToggle: action.toggle,
        commentcuid: action.commentcuid,
        commentAuthor: action.commentAuthor,
      };
    default:
      return state;
  }
};

// Get Edit
export const getEditComment = state => state.msgEdit;

export default MessageEditReducer;
