import React from "react"

const AuthedUserProfile = (props) => {
  console.log(props)

  let message = ""
  if (props.user !== undefined){
    message = props.user.email
  }

  return (
    <div>
      <h2>The current user is:</h2>
      <p>{message}</p>
    </div>
  )
}

export default AuthedUserProfile