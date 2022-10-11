const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="notification" id='notification'>
        {message}
      </div>
    )
}
  
export default Notification