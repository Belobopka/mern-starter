import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const COMMENT_INFO = 'COMMENT_INFO';
export const COMMENT_EDIT_TRIGGER = 'COMMENT_EDIT_TRIGGER';
export const COMMENT_EDIT_AND_TRIGGER = 'COMMENT_EDIT_AND_TRIGGER';
// Export Actions

export function toggleEditTrigger(toggle) {
  return (dispatch) => {
    return dispatch({
      type: COMMENT_EDIT_TRIGGER,
      payload: { toggle },
    });
  };
}

export function toggleEditCommentBox(commentcuid, commentAuthor, commentContent) {
  return (dispatch) => {
    return dispatch({
      type: COMMENT_INFO,
      payload: {
        commentcuid,
        commentAuthor,
        commentContent,
      },
    });
  };
}
export function editAndToggleComment(editedComment, cuidPost, toggle) {
  return (dispatch) => {
    return dispatch({
      type: COMMENT_EDIT_AND_TRIGGER,
      payload: {
        editedComment,
        cuidPost,
        toggle,
      },
    });
  };
}
export function editAndToggleCommentRequest(cuidPost, oldComment, editedCommentContent, toggle) {
  return (dispatch) => {
    return callApi(`comments/${cuidPost}`, 'put', {
      oldComment,
      editedCommentContent,
    })
    .then((editedComment) => dispatch(editAndToggleComment(editedComment, cuidPost, toggle)));
  };
}

export function addComment(comment, cuidPost) {
  return {
    type: ADD_COMMENT,
    comment,
    cuidPost,
  };
}

export function addCommentRequest(cuidPost, commentName, commentContent) {
  return (dispatch) => {
    return callApi(`comments/${cuidPost}`, 'post', {
      post: {
        commentName,
        commentContent,
      },
    })
    .then((res) => dispatch(addComment(res, cuidPost)));
  };
}


export function deleteComment(cuidPost, cuidComment) {
  return {
    type: DELETE_COMMENT,
    cuidPost,
    cuidComment,
  };
}

export function deleteCommentRequest(cuidPost, cuidComment) {
  return (dispatch) => {
    return callApi(`comments/${cuidPost}`, 'delete', { cuidPost, cuidComment }).
    then(() => dispatch(deleteComment(cuidPost, cuidComment)));
  };
}


export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    return callApi('posts', 'post', {
      post: {
        name: post.name,
        title: post.title,
        content: post.content,
      },
    }).then(res => dispatch(addPost(res.post)));
  };
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    return callApi('posts').then(res => {
      dispatch(addPosts(res.posts));
    });
  };
}

export function fetchPost(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`).then(res => dispatch(addPost(res.post)));
  };
}

export function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid,
  };
}

export function deletePostRequest(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`, 'delete').then(() => dispatch(deletePost(cuid)));
  };
}
