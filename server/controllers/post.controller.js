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
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function addMessage(req, res) {
  const newMessage = { name: req.body.post.name, content: req.body.post.content, cuid: cuid() };
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    post.comments.push(newMessage);
    console.error(post);
    post.save((error) => {
      if (error) {
        res.status(500).send(err);
        console.error('ERROR!');
      }
      console.error('post saved');
    });
  });

 /* Post.update({ cuid: req.params.cuid }, { comments: [...comments, newMessage] }, (err, post) => {
    post.comments.push(newMessage);
    console.error(post);
    post.save((error) => {
      if (error) {
        res.status(500).send(err);
        console.error('ERROR!');
      }
      console.error('post saved');
    })
  });
  */
}
/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function deleteMessage(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    post.comments = post.comments.filter(comments => comments.cuid !== req.body.cuidComment);
    post.save(error => {
      if (error) {
        console.error('post delete messsage Error');
      }
    })
    .then(() => {
      console.log('post got');
      res.status(200).end();
    });
  });
}

