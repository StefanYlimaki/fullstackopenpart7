import { connect } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = (props) => {
  if (props.notification === '') {
    return
  }

  return(
    <div>
      <Alert>
        {props.notification}
      </Alert>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
