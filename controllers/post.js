exports.postUserPosts = (req, res) => {
  res.status(200).json({ posts: { title: 'Welcome To The Post Page', description: 'This is a demo page' } })
}
