import { COMMENT_INFO, COMMENT_EDIT_TRIGGER } from './PostActions';

const initialCommentState = { commentEditToggle: false, commentcuid: '', commentAuthor: '', commentContent: '' };
const CommentEditReducer = (state = initialCommentState, action) => {
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
        ...state,
        commentEditToggle: action.payload.toggle,
      };
    default:
      return state;
  }
};

// Get Edit
export const getEditComment = state => state.commentEditInfo;


export default CommentEditReducer;
