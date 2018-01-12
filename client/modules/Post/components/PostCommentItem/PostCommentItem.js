import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './PostCommentItem.css';

function PostCommentItem(props) {
  return (
    <div className={styles['single-post']}>
      <p className={styles['author-name']}><FormattedMessage id="by" /> {props.comment.name}</p>
      <p className={styles['post-desc']}>{props.comment.content}</p>
      <p className={styles['post-action']}><button onClick={props.onDelete}><FormattedMessage id="deletePost" /></button></p>
      <hr className={styles.divider} />
    </div>
  );
}

PostCommentItem.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostCommentItem;