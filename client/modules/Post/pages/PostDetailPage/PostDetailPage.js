import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/PostListItem/PostListItem.css';

// Import Actions
import { fetchPost, deleteCommentRequest, addCommentRequest } from '../../PostActions';

// Import Selectors
import { getPost } from '../../PostReducer';

// Import TextForm for comments
import PostCommentTextBox from './PostCommentTextBox';

// Import PostCommentList
import PostCommentsList from '../../components/PostCommentsList';

import callApi from '../../../../util/apiCaller';

export class PostDetailPage extends React.Component {
  componentWillReceiveProps = () => {
    console.log('componentWillReceiveProps-post-detail-page');
  }
  shouldComponentUpdate = () => {
     console.log('shouldComponentUpdate-post-detail-page');
  }
  handleDeleteComment = (cuidComment) => {
    if (confirm('Do you want to delete this message?')) { // eslint-disable-line
      this.props.dispatch(deleteCommentRequest(this.props.post.cuid, cuidComment));
    }
  };
  handleAddComment = (commentName, commentContent) => {
    this.props.dispatch(addCommentRequest(this.props.post.cuid, commentName, commentContent));
  }
  render = () => {
    console.log('detail-page');
    return (
      <div>
        <Helmet title={this.props.post.title} />
        <div className={`${styles['single-post']} ${styles['post-detail']}`}>
          <h3 className={styles['post-title']}>{this.props.post.title}</h3>
          <p className={styles['author-name']}><FormattedMessage id="by" /> {this.props.post.name}</p>
          <p className={styles['post-desc']}>{this.props.post.content}</p>
        </div>
        <PostCommentTextBox cuid={this.props.post.cuid} handleAddComment={this.handleAddComment} />
        <PostCommentsList
          comments={this.props.post.comments}
          handleDeleteComment={this.handleDeleteComment}
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
};

export default connect(mapStateToProps)(PostDetailPage);
