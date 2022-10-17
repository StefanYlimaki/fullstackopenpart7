import { useSelector } from 'react-redux'
import { orderBy } from 'lodash'
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)
  const sortedUsers = orderBy(users, ['blogs'], ['desc'])
  const navigate = useNavigate()

  var green = '#81b71a'
  var blue = '#A9A9A9'

  return(
    <div>
      <h2>Users</h2>
      {!users
        ? <div>No users found</div>
        : <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow style={{ backgroundColor: green }}>
                <TableCell>
                  <strong>User</strong>
                </TableCell>
                <TableCell>
                  <strong>Blogs Added</strong>
                </TableCell>
              </TableRow>
              {sortedUsers.map(user => (
                <TableRow key={user.id} style={{ backgroundColor: blue }}>
                  <TableCell>
                    <Button onClick={() => navigate(`/users/${user.id}`)}>
                      {user.username}
                    </Button>
                  </TableCell>
                  <TableCell>
                    {user.blogs.length}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </div>
  )
}

export default Users