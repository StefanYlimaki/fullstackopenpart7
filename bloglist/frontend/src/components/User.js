import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from '@mui/material'

const User = () => {
  const { id } = useParams()
  const user = useSelector(state => state.users.find(user => user.id === id))

  var green = '#81b71a'
  var blue = '#A9A9A9'

  return(
    <div>
      {!user
        ? <div>User Not Found</div>
        : <div>
          <h2>{user.name}</h2>
          <div>
            {user.blogs.length !== 0
              ?
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow style={{ backgroundColor: green }}>
                      <TableCell>
                        <strong>Title</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Author</strong>
                      </TableCell>
                    </TableRow>
                    {user.blogs.map(blog => (
                      <TableRow key={blog.id} style={{ backgroundColor: blue }}>
                        <TableCell>
                          <Link to={`/blogs/${blog.id}`}> {blog.title}</Link>
                        </TableCell>
                        <TableCell>
                          {blog.author}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              : <div>No Blogs Added</div>
            }
          </div>
        </div>}
    </div>
  )
}

export default User