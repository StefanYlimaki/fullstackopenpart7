import { useSelector } from 'react-redux'
import { orderBy } from 'lodash'
import { Link } from 'react-router-dom'
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from '@mui/material'

const DisplayBlogs = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = orderBy(blogs, ['likes'], ['desc'])

  var green = '#81b71a'
  var blue = '#A9A9A9'

  return (
    <div>
      <h2>Blogs</h2>
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
            {sortedBlogs.map(blog => (
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
    </div>
  )
}

export default DisplayBlogs
