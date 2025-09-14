import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout/Layout";
import { RouteAddCategory, RouteBlog, RouteBlogAdd, RouteBlogByCategory, RouteBlogDetails, RouteBlogEdit, RouteCategoryDetails, RouteCommentDetails, RouteEditCategory, RouteIndex, RouteProfile, RouteSearch, RouteSignIn, RouteSignUp, RouteUser } from "./helpers/RouteName";
import Index from "./pages/index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import CategoryDetails from "./pages/Category/CategoryDetails";
import AddCategory from "./pages/Category/AddCategory";
import EditCategory from "./pages/Category/EditCategory";
import BlogDetails from "./pages/Blog/BlogDetails";
import EditBlog from "./pages/Blog/EditBlog";
import AddBlog from "./pages/Blog/AddBlog";
import SingleBlogDetail from "./pages/SingleBlogDetail.jsx";
import BlogByCategory from "./pages/Blog/BlogByCategory";
import SearchResult from "./pages/SearchResult";
import CommentPage from "./pages/CommentPage";
import Users from "./pages/Users";
import AuthRouteProtection from "./components/AuthRouteProtection";
import AdminAuthProtection from "./components/AdminAuthProtection";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />

          {/* blog */}


          <Route path={RouteBlogDetails()} element={<SingleBlogDetail />} />
          <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
          <Route path={RouteSearch()} element={<SearchResult />} />



        <Route element={<AuthRouteProtection />}>
          <Route path={RouteProfile} element={<Profile />} />

          {/* Blog protection */}
          <Route path={RouteBlog} element={<BlogDetails />} />
          <Route path={RouteBlogAdd} element={< AddBlog />} />
          <Route path={RouteBlogEdit()} element={<EditBlog />} />
          {/* Comment */}
          <Route path={RouteCommentDetails} element={<CommentPage />} />



        </Route>
        <Route element={<AdminAuthProtection />}>
          {/* blog cetegory */}
          <Route path={RouteAddCategory} element={<AddCategory />} />
          <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
          <Route path={RouteEditCategory()} element={<EditCategory />} />

          {/* user */}
          <Route path={RouteUser} element={<Users />} />
        </Route>

        </Route>

        <Route path={RouteSignIn} element={<SignIn />} />
        <Route path={RouteSignUp} element={<SignUp />} />

      </Routes>
    </BrowserRouter>
  )
};

export default App;
