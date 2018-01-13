import React, { PureComponent, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';


// Import Style
import styles from './CommentEditBox.css';

export class CommentEditBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
  }
  handleContentChange = (e) => {
    this.setState({ content: e.target.value });
  }
  handleEdit = () => {
    const content = this.state.content;
    this.props.handleEditComment(content);
    this.setState({ content: '' });
  }
  render() {
    const cls = `${styles.form} ${(styles.appear)}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewPost" /></h2>
          <textarea placeholder={this.props.intl.messages.postContent} className={styles['form-field']} value={this.state.content} onChange={this.handleContentChange} />
          <button className={styles['post-submit-button']} onClick={this.handleEdit}><FormattedMessage id="submit" /></button>
        </div>
      </div>
    );
  }
}

CommentEditBox.propTypes = {
  intl: intlShape.isRequired,
  handleEditComment: PropTypes.func.isRequired,
};


export default injectIntl(CommentEditBox);
