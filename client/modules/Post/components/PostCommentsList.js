import React, { PropTypes } from 'react';

// Import Components
import PostCommentItem from './PostCommentItem/PostCommentItem';

class PostCommentsList extends React.Component {
  render = () => { 
    console.log(this.props);
    return (
    <div className="listView">
        {
        this.props.comments.map(comment => (
          <PostCommentItem
            comment={comment}
            key={comment.cuid}
            onDelete={() => this.props.handleDeleteComment(comment.cuid)}
          />
        ))
        }
    </div>
        );
  }
}
PostCommentsList.propTypes = {
  handleDeleteComment: PropTypes.func.isRequired,
  comments: PropTypes.array,
};
PostCommentsList.defaultProps = {
  comments: [],
};

export default PostCommentsList;
