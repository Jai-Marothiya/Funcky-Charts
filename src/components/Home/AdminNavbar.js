import React from 'react'

const AdminNavbar = ({userDetails,setUserDetails,handleSignOut}) => {
  return (
    <nav style={{borderBottom:"2px solid grey"}}>
        <ul style={{display:"flex", justifyContent:"space-around", listStyle:"none"}}>
            <li> User - {userDetails.userName}</li>
            {/* <li></li> */}
            <li><button onClick={handleSignOut}>SIGN-OUT</button></li>
        </ul>

    </nav>
  )
}

export default AdminNavbar