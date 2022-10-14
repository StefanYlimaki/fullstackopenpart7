import { connect } from 'react-redux'

const Notification = (props) => {
  if (props.notification === '') {
    return
  }

  return <div className="notification">{props.notification}</div>
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
