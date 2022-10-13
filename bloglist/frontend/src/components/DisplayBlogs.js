import Blog from './Blog'
import { useSelector } from 'react-redux'
import { orderBy } from 'lodash'

const DisplayBlogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = orderBy(blogs, ['likes'], ['desc'])

  const user = JSON.parse(window.localStorage.getItem('loggedUser'))

  return (
    <>
      {sortedBlogs.map((blog) => (
        <Blog id="blog" key={blog.id} blog={blog} user={user} />
      ))}
    </>
  )
}

export default DisplayBlogs
