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
      const newData = state.data.slice();
      newData.forEach(post => {
        if (post.cuid === action.cuidPost) {
          post.comments = post.comments.filter((cuidpostComment) => {
            return cuidpostComment.cuid !== action.cuidComment;
          });
        }
      });
      console.log(newData);
      return {
        data: newData,
      };
  /*  case ADD_COMMENT :
        return {
          action.posts,
      };
  */
    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getPosts = state => state.posts.data;

// Get post by cuid
export const getPost = (state, cuid) => {
  return state.posts.data.filter(post => post.cuid === cuid)[0];
};

// Export Reducer
export default PostReducer;
