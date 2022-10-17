import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)
  const navigate = useNavigate()

  return(
    <div>
      <h2>Users</h2>
      {!users
        ? <div>No users found</div>
        : <table width='25%' border='2'>
          <tbody>
            <tr>
              <td><strong>User: </strong></td>
              <td><strong>Blogs Created</strong></td>
            </tr>
            {users.map(user =>
              <tr key={user.username}>
                <td>{<button onClick={() => navigate(`/users/${user.id}`)}>{user.username}</button>}</td>
                <td>{user.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </table>
      }
    </div>
  )
}

export default Users