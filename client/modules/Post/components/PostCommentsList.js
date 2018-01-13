import React, { PropTypes } from 'react';

// Import Components
import PostCommentItem from './PostCommentItem/PostCommentItem';

function PostCommentsList(props) {
  return (
    <div className="listView">
        {
        props.comments.map(comment => (
          <PostCommentItem
            comment={comment}
            key={comment.cuid}
            onDelete={() => props.handleDeleteComment(comment.cuid)}
            handleToggleCommentEditBox={() => props.handleToggleCommentEditBox(comment.cuid, comment.name)}
          />
        ))
        }
    </div>
      );
}

PostCommentsList.propTypes = {
  handleDeleteComment: PropTypes.func.isRequired,
  handleToggleCommentEditBox: PropTypes.func.isRequired,
  comments: PropTypes.array,
};

export default PostCommentsList;
