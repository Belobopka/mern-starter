import { ADD_POST, ADD_POSTS, DELETE_POST, ADD_COMMENT, DELETE_COMMENT } from './PostActions';

// Initial State
const initialState = { data: [] };

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST :
      return {
        data: [action.post, ...state.data],
      };

    case ADD_POSTS :
      return {
        data: action.posts,
      };

    case DELETE_POST :
      return {
        data: state.data.filter(post => post.cuid !== action.cuid),
      };

    case DELETE_COMMENT :
      return {
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
        data: state.data.slice(0).map(post => {
          if (post.cuid === action.cuidPost) {
            return {
              ...post, comments: [action.comment, ...post.comments],
            };
          }
          return post;
        }),
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

// Export Reducer
export default PostReducer;
