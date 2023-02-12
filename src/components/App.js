import { useEffect } from "react";
import { getPosts } from "../api";
import Home from "../pages/Home";
import Login  from "../pages/Login";
import { Loader } from "./Loader";
import { useState } from "react";
import { NavBar } from "./NavBar";
import { BrowserRouter as Router,redirect,Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks";
import Settings from "../pages/settings"
import Signup from "../pages/signup";
import UserProfile from "../pages/userProfile";
import { Outlet,Navigate } from "react-router-dom";

const PrivateRoutes =()=> 
{
  const auth=useAuth();
  return (
  auth.user ? <Outlet />:<Navigate to="/login" />
  ) 
 
}
export function App() {
  const auth=useAuth();
  
 
  if(auth.loading)
  {
    return <Loader />
  }
  return (
   
    <div className="App">
      
      <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/login" element={<Login/>}>
        </Route> 
        <Route path="/signup" element={ <Signup />}>
        </Route>
        <Route element={<PrivateRoutes/>}>
              <Route path="/settings" element={ <Settings />}>
              </Route>
              <Route path="/user/:userId" element={ <UserProfile />}>
              </Route>
        </Route>
        
        
      </Routes>
      </Router> 
    </div>
  );
}


