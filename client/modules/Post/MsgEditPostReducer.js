import { COMMENT_INFO, COMMENT_EDIT_TRIGGER } from './PostActions';

const initialMessageState = { commentEditToggle: false, commentcuid: '', commentAuthor: '', commentContent: '' };
const MessageEditReducer = (state = initialMessageState, action) => {
  switch (action.type) {
    case COMMENT_INFO :
      return {
        ...state,
        commentcuid: action.payload.commentcuid,
        commentAuthor: action.payload.commentAuthor,
        commentContent: action.payload.commentContent,
      };
    case COMMENT_EDIT_TRIGGER :
      return {
        ...state, commentEditToggle: action.payload.toggle,
      };
    default:
      return state;
  }
};

// Get Edit
export const getEditComment = state => state.msgEdit;


export default MessageEditReducer;
