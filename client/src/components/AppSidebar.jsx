import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import logo from "@/assets/images/gemini.png";
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { GoDot } from "react-icons/go";
import { RouteBlog, RouteBlogByCategory, RouteCategoryDetails, RouteCommentDetails, RouteIndex, RouteUser } from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { useSelector } from "react-redux";





const AppSidebar = () => {
  const user = useSelector(state => state.user)
  const { data: categoryData } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
    method: 'get',
    credentials: 'include'
  })

  return (
    <Sidebar>
      <SidebarHeader className="bg-white">
        <img src={logo} width={80} className="w-24 h-12" />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup >
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <IoHomeOutline />
                <Link to={RouteIndex}>Home</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {user && user.isLoggedIn ? <> <SidebarMenuItem>
              <SidebarMenuButton>
                <GrBlog />
                <Link to={RouteBlog}>Blogs</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FaRegComments />
                  <Link to={RouteCommentDetails}>Comments</Link>
                </SidebarMenuButton>
              </SidebarMenuItem></> : <></>}

            {user && user.isLoggedIn && user.user.role === 'admin' ? <> <SidebarMenuItem>
              <SidebarMenuButton>
                <BiCategoryAlt />
                <Link to={RouteCategoryDetails}>Categories</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <LuUsers />
                  <Link to={RouteUser}>Users</Link>
                </SidebarMenuButton>
              </SidebarMenuItem></> : <></>}

          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup >
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenu>
            {categoryData && categoryData.category.length > 0
              && categoryData.category.map(category =>
                <SidebarMenuItem key={category._id}>
                  <SidebarMenuButton>
                    <GoDot />
                    <Link to={RouteBlogByCategory(category.slug)}>{category.name}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )

            }

          </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>

    </Sidebar>
  )
}

export default AppSidebar