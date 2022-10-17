import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const { id } = useParams()
  const user = useSelector(state => state.users.find(user => user.id === id))

  return(
    <div>
      {!user
        ? <div>User Not Found</div>
        : <div>
          <h2>{user.name}</h2>
          <div>
            Added blogs:
            {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
          </div>
        </div>}
    </div>
  )
}

export default User