import React, { PureComponent, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';


// Import Style
import styles from './PostCommentTextBox.css';

export class PostCommentTextBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', content: '' };
  }
  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }
  handleContentChange = (e) => {
    this.setState({ content: e.target.value });
  }
  addComment = () => {
    const name = this.state.name;
    const content = this.state.content;
    this.props.handleAddComment(name, content);
    this.setState({ name: '', content: '' });
  };

  render() {
    console.log('PostCommentTextBox render');
    const cls = `${styles.form} ${(styles.appear)}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewPost" /></h2>
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} value={this.state.name} onChange={this.handleNameChange} />
          <textarea placeholder={this.props.intl.messages.postContent} className={styles['form-field']} value={this.state.content} onChange={this.handleContentChange} />
          <button className={styles['post-submit-button']} onClick={this.addComment}><FormattedMessage id="submit" /></button>
        </div>
      </div>
    );
  }
}

PostCommentTextBox.propTypes = {
  intl: intlShape.isRequired,
  handleAddComment: PropTypes.func.isRequired,
};

export default injectIntl(PostCommentTextBox);
