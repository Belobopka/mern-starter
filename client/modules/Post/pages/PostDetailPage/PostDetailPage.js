import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/PostListItem/PostListItem.css';

// Import Actions
import { fetchPost, deleteCommentRequest, addCommentRequest, toggleEditCommentBox, editCommentRequest, toggleEditTrigger } from '../../PostActions';

// Import Selectors
import { getPost } from '../../PostReducer';

import { getEditComment } from '../../MsgEditPostReducer';

// Import TextForm for comments
import PostCommentTextBox from './PostCommentTextBox';

// Import PostCommentList
import PostCommentsList from '../../components/PostCommentsList';

import CommentEditBox from '../../components/CommentEditBox/CommentEditBox';

export class PostDetailPage extends React.Component {
  handleDeleteComment = (cuidComment) => {
    if (confirm('Do you want to delete this message?')) { // eslint-disable-line
      this.props.dispatch(deleteCommentRequest(this.props.post.cuid, cuidComment));
    }
  };
  handleAddComment = (commentName, commentContent) => {
    this.props.dispatch(addCommentRequest(this.props.post.cuid, commentName, commentContent));
  }
  handleToggleCommentEditBox = (commentcuid, commentAuthor, commentContent) => {
    console.log('this.props.messageEditInfo.commentcuid', this.props.messageEditInfo.commentcuid);
    console.log(commentcuid);
    // editbox is toggled
    if (this.props.messageEditInfo.commentcuid !== commentcuid && this.props.messageEditInfo.commentcuid !== '') {
     // this.props.dispatch(toggleEditTrigger(!this.props.messageEditInfo.commentEditToggle));
      console.log('commentcuid !== ');
      this.props.dispatch(toggleEditCommentBox(commentcuid, commentAuthor, commentContent));
      return;
    } else if (this.props.messageEditInfo.commentcuid === '') {
      console.log('first init');
      this.props.dispatch(toggleEditTrigger(!this.props.messageEditInfo.commentEditToggle));
      this.props.dispatch(toggleEditCommentBox(commentcuid, commentAuthor, commentContent));
      return;
    }
    this.props.dispatch(toggleEditTrigger(!this.props.messageEditInfo.commentEditToggle));
    this.props.dispatch(toggleEditCommentBox(commentcuid, commentAuthor, commentContent));
  }
  handleEditComment = (newCommentData) => {
    this.props.dispatch(editCommentRequest(this.props.post.cuid, {
      cuid: this.props.messageEditInfo.commentcuid,
      author: this.props.messageEditInfo.commentAuthor,
    },
    newCommentData));
  }
  render = () => {
    return (
      <div>
        <Helmet title={this.props.post.title} />
        <div className={`${styles['single-post']} ${styles['post-detail']}`}>
          <h3 className={styles['post-title']}>{this.props.post.title}</h3>
          <p className={styles['author-name']}><FormattedMessage id="by" /> {this.props.post.name}</p>
          <p className={styles['post-desc']}>{this.props.post.content}</p>
        </div>
        {
          this.props.messageEditInfo.commentEditToggle ?
            <CommentEditBox
              handleEditComment={this.handleEditComment}
              commentcuid={this.props.messageEditInfo.commentcuid}
              commentContent={this.props.messageEditInfo.commentContent}
            />
            :
            <PostCommentTextBox
              handleAddComment={this.handleAddComment}
            />
        }
        <PostCommentsList
          comments={this.props.post.comments}
          handleDeleteComment={this.handleDeleteComment}
          handleToggleCommentEditBox={this.handleToggleCommentEditBox}
        />
      </div>
  );
  }
}
// Actions required to provide data for this component to render in sever side.
PostDetailPage.need = [params => {
  return fetchPost(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    post: getPost(state, props.params.cuid),
    messageEditInfo: getEditComment(state),
  };
}

PostDetailPage.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  messageEditInfo: PropTypes.shape({
    commentEditToggle: PropTypes.bool.isRequired,
    commentcuid: PropTypes.string.isRequired,
    commentAuthor: PropTypes.string.isRequired,
    commentContent: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(PostDetailPage);
