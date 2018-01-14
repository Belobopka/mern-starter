import Post from '../models/post';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getPosts(req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addPost(req, res) {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    res.status(403).end();
  }

  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
}


/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getPost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deletePost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}

/**
 * Add a message
 * @param req
 * @param res
 * @returns void
 */
export function addComment(req, res) {
  const comment = { name: req.body.post.commentName, content: req.body.post.commentContent, cuid: cuid() };
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    const newPostComments = [comment, ...post.comments];
    post.set({ comments: newPostComments });
    post.save((error) => {
      if (error) {
        res.status(500).send(err);
        console.error('ERROR!');
      } else {
        res.json(comment);
        console.error('Comment saved');
      }
    });
  });
}

/**
 * Delete a message
 * @param req
 * @param res
 * @returns void
 */
export function deleteComment(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    const newPostComments = post.comments.filter(comments => comments.cuid !== req.body.cuidComment);
    post.set({ comments: newPostComments });
    post.save(error => {
      if (error) {
        console.error('post delete messsage Error');
      }
    })
    .then(() => {
      console.log('message deleted');
      res.status(200).end();
    });
  });
}

/**
 * Edit a message
 * @param req
 * @param res
 * @returns void
 */
export function editComment(req, res) {
  const oldCommentcuid = req.body.oldComment.cuid;
  const oldCommentAuthor = req.body.oldComment.author;
  const comment = { name: oldCommentAuthor, content: req.body.editedCommentContent, cuid: oldCommentcuid }; // cuid : cuid();
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    const newPostComments = post.comments.map(
      postComment => {
        if (postComment.cuid === oldCommentcuid) {
          return comment;
        }
        return postComment;
      });
    post.set({ comments: newPostComments });
    post.save((error) => {
      if (error) {
        res.status(500).send(err);
        console.error('ERROR!');
      } else {
        res.json(comment);
        console.error('message edited');
      }
    });
  });
}
