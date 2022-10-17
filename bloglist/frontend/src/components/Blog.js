import { useSelector } from 'react-redux'
import SingleBlog from './SingleBlog'


import { useParams } from 'react-router-dom'

const Blog = () => {
  const { id } = useParams()
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))

  if(!blog){
    return null
  } else {
    return(
      <SingleBlog blog={blog}/>
    )
  }
}


export default Blog
