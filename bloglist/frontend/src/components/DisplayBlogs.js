import { useSelector } from 'react-redux'
import { orderBy } from 'lodash'
import { Link } from 'react-router-dom'

const DisplayBlogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = orderBy(blogs, ['likes'], ['desc'])

  return (
    <>
      {sortedBlogs.map((blog) => (
        <div key={blog.id} className='blog'>
          <Link to={`/blogs/${blog.id}`}> {blog.title}</Link>
        </div>
      ))}
    </>
  )
}

export default DisplayBlogs
