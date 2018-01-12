import React, { PureComponent, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import callApi from '../../../../util/apiCaller';

// Import Style
import styles from './PostCommentTextBox.css';

export class PostCommentTextBox extends PureComponent {
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
  addMessage = () => {
    const name = this.state.name;
    const content = this.state.content;
    callApi(`comments/${this.props.cuid}`, 'post', {
      post: {
        name,
        content,
      },
    });
  };

  render() {
    const cls = `${styles.form} ${(styles.appear)}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewPost" /></h2>
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} onChange={this.handleNameChange} />
          <textarea placeholder={this.props.intl.messages.postContent} className={styles['form-field']} onChange={this.handleContentChange} />
          <a className={styles['post-submit-button']} href="#" onClick={this.addMessage}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

PostCommentTextBox.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(PostCommentTextBox);
