import AppSidebar from "@/components/AppSidebar";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import React from "react";

const Layout = () => {
  return (
    //topbar
    //sidebar
    <SidebarProvider>
    <Topbar />
    <AppSidebar/>
    <main className=" w-full">
        <div className="w-full min-h-[calc(100vh-40px)] py-22 px-8">
        <Outlet/>
        </div>
        
        <Footer/>
    </main>

    </SidebarProvider>
    
  )
};

export default Layout;
