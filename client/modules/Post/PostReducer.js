import { 
  ADD_POST,
  ADD_POSTS,
  DELETE_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  COMMENT_INFO,
  COMMENT_EDIT_TRIGGER,
  COMMENT_EDIT_AND_TRIGGER } from './PostActions';

// Initial State
const initialState = { data: [], commentEditInfo: {
  commentEditToggle: false,
  commentcuid: '',
  commentAuthor: '',
  commentContent: '',
},
};
const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST :
      return {
        ...state,
        data: [action.post, ...state.data],
      };

    case ADD_POSTS :
      return {
        ...state,
        data: action.posts,
      };

    case DELETE_POST :
      return {
        ...state,
        data: state.data.filter(post => post.cuid !== action.cuid),
      };

    case DELETE_COMMENT :
      return {
        ...state,
        data: state.data.slice(0).map(post => {
          if (post.cuid === action.cuidPost) {
            const newComments = post.comments.filter((cuidpostComment) => {
              return cuidpostComment.cuid !== action.cuidComment;
            });
            return {
              ...post, comments: newComments,
            };
          }
          return post;
        }),
      };

    case ADD_COMMENT :
      return {
        ...state,
        data: state.data.slice(0).map(post => {
          if (post.cuid === action.cuidPost) {
            return {
              ...post, comments: [action.comment, ...post.comments],
            };
          }
          return post;
        }),
      };
    case EDIT_COMMENT :
      return {
        ...state,
        data: state.data.slice(0).map(post => {
          if (post.cuid === action.cuidPost) {
            const newComments = post.comments.map(
              postComment => {
                if (postComment.cuid === action.editedComment.cuid) {
                  return action.editedComment;
                }
                return postComment;
              });
            return {
              ...post, comments: newComments,
            };
          }
          return post;
        }),
      };
    case COMMENT_INFO :
      return {
        ...state, commentEditInfo: {
          ...state.commentEditInfo,
          commentcuid: action.payload.commentcuid,
          commentAuthor: action.payload.commentAuthor,
          commentContent: action.payload.commentContent,
        }
      };
    case COMMENT_EDIT_TRIGGER :
      return {
        ...state, commentEditInfo: {
          ...state.commentEditInfo,
          commentEditToggle: action.payload.toggle,
        }
      };
    case COMMENT_EDIT_AND_TRIGGER:
      return {
        ...state,
        data: state.data.slice(0).map(post => {
          if (post.cuid === action.payload.cuidPost) {
            const newComments = post.comments.map(
              postComment => {
                if (postComment.cuid === action.payload.editedComment.cuid) {
                  return action.payload.editedComment;
                }
                return postComment;
              });
            return {
              ...post, comments: newComments,
            };
          }
          return post;
        }),
        commentEditInfo: {
          ...state.commentEditInfo,
          commentEditToggle: action.payload.toggle,
        }
      };
    default:
      return state;
  }
};
/* Selectors */

// Get all posts
export const getPosts = state => state.posts.data;

// Get post by cuid
export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];

export const getEditComment = state => state.posts.commentEditInfo;

// Export Reducer
export default PostReducer;
