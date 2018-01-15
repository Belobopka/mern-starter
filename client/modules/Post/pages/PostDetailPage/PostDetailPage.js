import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/PostListItem/PostListItem.css';

// Import Actions
import { fetchPost, deleteCommentRequest, addCommentRequest, toggleEditCommentBox, editAndToggleCommentRequest, toggleEditTrigger } from '../../PostActions';

// Import Selectors
import { getPost, getEditComment } from '../../PostReducer';

// Import TextForm for comments
import PostCommentTextBox from './PostCommentTextBox';

// Import PostCommentList
import PostCommentsList from '../../components/PostCommentsList';

export class PostDetailPage extends React.Component {
  handleDeleteComment = (cuidComment) => {
    this.props.dispatch(deleteCommentRequest(this.props.post.cuid, cuidComment));
  };
  handleAddComment = (commentName, commentContent) => {
    this.props.dispatch(addCommentRequest(this.props.post.cuid, commentName, commentContent));
  }
  handleToggleCommentEditBox = (commentcuid, commentAuthor, commentContent) => {
    if (this.props.commentEditInfo.commentcuid !== commentcuid && this.props.commentEditInfo.commentEditToggle) {
      this.props.dispatch(toggleEditCommentBox(commentcuid, commentAuthor, commentContent));
      return;
    }
    this.props.dispatch(toggleEditTrigger(!this.props.commentEditInfo.commentEditToggle));
    this.props.dispatch(toggleEditCommentBox(commentcuid, commentAuthor, commentContent));
  }
  handleEditComment = (newCommentData) => {
    if (
      newCommentData.trim().length <= 0 ||
      this.props.commentEditInfo.commentContent === newCommentData) {
      this.props.dispatch(toggleEditTrigger(!this.props.commentEditInfo.commentEditToggle));
      return;
    }
    this.props.dispatch(editAndToggleCommentRequest(this.props.post.cuid, {
      cuid: this.props.commentEditInfo.commentcuid,
      author: this.props.commentEditInfo.commentAuthor,
    },
    newCommentData,
    !this.props.commentEditInfo.commentEditToggle,
    ));
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
        <PostCommentTextBox
          handleAddComment={this.handleAddComment}
        />
        <PostCommentsList
          comments={this.props.post.comments}
          handleDeleteComment={this.handleDeleteComment}
          handleToggleCommentEditBox={this.handleToggleCommentEditBox}
          commentEditInfo={this.props.commentEditInfo}
          handleEditComment={this.handleEditComment}
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
    commentEditInfo: getEditComment(state),
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
  commentEditInfo: PropTypes.shape({
    commentEditToggle: PropTypes.bool.isRequired,
    commentcuid: PropTypes.string.isRequired,
    commentAuthor: PropTypes.string.isRequired,
    commentContent: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(PostDetailPage);
