import React, { PropTypes } from 'react';

// Import Components
import PostCommentItem from './PostCommentItem/PostCommentItem';

function PostCommentsList(props) {
  console.log('PostCommentsList', props.commentEditInfo);
  return (
    <div className="listView">
        {
        props.comments.map(comment => (
          <PostCommentItem
            comment={comment}
            key={comment.cuid}
            onDelete={() => props.handleDeleteComment(comment.cuid)}
            handleToggleCommentEditBox={() => props.handleToggleCommentEditBox(comment.cuid, comment.name, comment.content)}
            commentEditInfo={props.commentEditInfo}
            handleEditComment={props.handleEditComment}
          />
        ))
        }
    </div>
      );
}

PostCommentsList.propTypes = {
  handleDeleteComment: PropTypes.func.isRequired,
  handleToggleCommentEditBox: PropTypes.func.isRequired,
  handleEditComment: PropTypes.func.isRequired,
  comments: PropTypes.array,
  commentEditInfo: PropTypes.object.isRequired,
};

export default PostCommentsList;
