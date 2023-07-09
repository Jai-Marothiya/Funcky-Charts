import React from 'react';
import Gravatar from 'react-gravatar';

const AdminNavbar = ({userDetails,setUserDetails,handleSignOut}) => {
  return (
    <nav className='w-full  fixed  bg-white shadow-navbar  z-3    '>
        <ul className='h-16 flex justify-center items-center list-none'>
            <li className='w-1/10 flex justify-center items-center gap-3'>
              <img src='./Favicon.ico' className='w-1/4'/>
              <h2>DashBoard</h2>
            </li>
            <li className='w-4/5 text-end '><h2 className='capitalize'>{userDetails.userName}</h2></li>
            <li className='w-1/10 flex justify-center items-center gap-3'>
              {
                userDetails.userName ?
                <Gravatar email={userDetails.email} className='rounded-full w-1/4' />
                :
                <img src='../images/Dummy_admin_image.png' alt='admin image' className='w-1/4'/>
              
              }
              {/* <img src='../images/Dummy_admin_image.png' alt='admin image' className='w-1/4'/> */}
              <button className='shadow-button px-[10px] py-[5px]' onClick={handleSignOut}>Sign Out</button>
            </li>
        </ul>

    </nav>
  )
}

export default AdminNavbar