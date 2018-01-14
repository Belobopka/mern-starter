import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import Modal from 'react-modal';
// Import Style
import styles from './PostCommentItem.css';

class PostCommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: this.props.comment.content, showModal: false };
  }

  handleEdit = () => {
    const content = this.state.content;
    this.props.handleEditComment(content);
  }
  handleOpenModal = () => {
    this.setState({ showModal: true });
  }
  handleConfirmModal = () => {
    this.setState({ showModal: false });
    this.props.onDelete();
  }
  handleDeclineModal = () => {
    this.setState({ showModal: false });
  }
  handleContentChange = (e) => {
    this.setState({ content: e.target.value });
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
              <submit className={styles['comment-edit-submit-button']} onClick={this.handleEdit}><FormattedMessage id="submit" /></submit>
            </div>
          :
            <div>
              <p className={styles['post-desc']}>{this.props.comment.content}</p>
              <p className={styles['post-action']}>
                <submit onClick={this.handleOpenModal}><FormattedMessage id="deleteComment" /></submit>
                <submit onClick={this.props.handleToggleCommentEditBox}><FormattedMessage id="edit" /></submit>
              </p>
            </div>
          }
        <Modal isOpen={this.state.showModal} className={styles['modal-style']} ariaHideApp={false}>
          <p className={styles['modal-desc']}> <FormattedMessage id="deleteAlert" /> </p>
          <submit className={styles['comment-edit-submit-button']} onClick={this.handleConfirmModal} > <FormattedMessage id="submit" /> </submit>
          <submit className={styles['comment-edit-cancel-button']} onClick={this.handleDeclineModal} > <FormattedMessage id="cancel" /> </submit>
        </Modal>
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
