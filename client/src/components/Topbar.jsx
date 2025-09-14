import React, { useState } from "react";
import logo from "@/assets/images/gemini.png";
import { Button } from "./ui/button";
import { Link, useNavigate, } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import SearchBox from "./SearchBox";
import { RouteBlogAdd, RouteIndex, RouteProfile, RouteSignIn } from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineSearch } from "react-icons/md";
import { FiMenu } from "react-icons/fi";



//dropdown menu import
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// import avatar 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import usericon from '@/assets/images/user.png'
import { LiaUserAstronautSolid } from "react-icons/lia";
import { IoMdAdd } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { removeUser } from "@/redux/user/user.slice";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { useSidebar } from "./ui/sidebar";






const Topbar = () => {
  const { toggleSidebar} = useSidebar()
  const [showSearchBox, setShowSearchBox] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

 const handleLogout = async () => {
        try {
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/logout`, {
                method: 'get',
                credentials: 'include',
            })
            const data = await response.json()
            if (!response.ok) {
                return showToast('error', data.message)
            }
            dispatch(removeUser())
            navigate(RouteIndex)
            showToast('success', data.message)
        } catch (error) {
            showToast('error', error.message)
        }
    }

    const toggleSearch =()=>{
        setShowSearchBox(!showSearchBox)
    }

  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b border-gray-100">
      <div className="flex justify-center items-center ">

       
          <button onClick={toggleSidebar} type='button'>
        <FiMenu size={16} />

          </button>

        
        <Link to={RouteIndex}>
        <img src={logo} className="w-60 md:h-14 md:w-26 " />
        </Link>
      </div>
      <div className="w-[500px]">
        <div className={`md:relative md:block absolute bg-white left-0 w-full md:top-0 top-16 md:p-0 p-4 ${showSearchBox ? 'block':'hidden'}`}>
        <SearchBox />
          
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button onClick={toggleSearch} type="button" className="md:hidden block">
          <MdOutlineSearch size={25}/>
        </button>

        {!user.isLoggedIn ?
          <Button asChild className="rounded-full bg-violet-500 text-white hover:bg-blue-600 ">

            <Link to={RouteSignIn}>
              <MdLogin />
              Sign In
            </Link>
          </Button> :
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src={user?.user?.avatar  || usericon} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={8} className="p-2 shadow-lg rounded-md">
              <DropdownMenuLabel><p>{user?.user?.name}</p>
                <p className="text-sm">{user?.user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild  className='cursor-pointer'>
                <Link to={RouteProfile}>
                  <LiaUserAstronautSolid />

                  Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild  className='cursor-pointer'>
                <Link to={RouteBlogAdd}>
                  <IoMdAdd />

                  Create Blog</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>

                <IoLogOutOutline color="red" />

                Logout
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        }

      </div>

    </div>
  )
};

export default Topbar;
