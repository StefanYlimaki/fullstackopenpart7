const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.status(200).json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.status(200).json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blogToBedeleted = await Blog.findById(request.params.id)
  const user = request.user

  if (blogToBedeleted.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response
      .status(400)
      .json({ error: 'blog is posted by another user' })
  }
})

blogsRouter.post('/', async (request, response) => {
  const token = request.token

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = request.user

  const blog = new Blog(request.body)
  blog.user = user

  if (blog.likes === undefined) {
    blog.likes = 0
  }

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  const blog = { ...body }

  await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  })

  if (blog) {
    res.status(200).json(blog)
  } else {
    res.status(404).end()
  }
})

module.exports = blogsRouter
