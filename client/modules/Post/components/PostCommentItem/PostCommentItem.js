import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './PostCommentItem.css';

class PostCommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: this.props.comment.content };
  }
  handleContentChange = (e) => {
    this.setState({ content: e.target.value });
  }
  handleEditComment = () => {
    const content = this.state.content;
    this.props.handleEditComment(content);
  }
  render = () => {
    return (
      <div className={styles['single-post']}>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {this.props.comment.name}</p>
        {
          this.props.commentEditInfo.commentEditToggle &&
          this.props.commentEditInfo.commentcuid === this.props.comment.cuid
          ?
            <div>
              <input className={styles['message-desc']} onChange={this.handleContentChange} value={this.state.content} />
              <submit className={styles['comment-edit-submit-button']} onClick={this.props.handleToggleCommentEditBox}><FormattedMessage id="cancel" /></submit>
              <submit className={styles['comment-edit-submit-button']} onClick={this.handleEditComment}><FormattedMessage id="submit" /></submit>
            </div>
          :
            <div>
              <p className={styles['post-desc']}>{this.props.comment.content}</p>
              <p className={styles['post-action']}>
                <submit onClick={this.props.onDelete}><FormattedMessage id="deleteComment" /></submit>
                <submit onClick={this.props.handleToggleCommentEditBox}><FormattedMessage id="edit" /></submit>
              </p>
            </div>
          }
        <hr className={styles.divider} />
      </div>
    );
  }
}

PostCommentItem.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  handleToggleCommentEditBox: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  commentEditInfo: PropTypes.shape({
    commentEditToggle: PropTypes.bool.isRequired,
    commentcuid: PropTypes.string.isRequired,
  }).isRequired,
  handleEditComment: PropTypes.func.isRequired,
};

export default PostCommentItem;
