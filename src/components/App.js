import { useEffect } from "react";
import { getPosts } from "../api";
import { Home,Login } from "../pages";
import { Loader } from "./Loader";
import { useState } from "react";
import { NavBar } from "./NavBar";
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
const About=()=>{
  return (
    <div>About</div>
  )
}
export function App() {
  const [posts,setPosts] = useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    const fetchPosts = async ()=>{
         const response=await getPosts();
         
         console.log("response",response);
         if(response.success)
         {
          setPosts(response.data.posts);
         }
         setLoading(false);
         console.log("posts",posts);
    }
    fetchPosts();
  },[]);
  if(loading)
  {
    return <Loader />
  }
  return (
   
    <div className="App">
      
      <Router>
      <NavBar />
      <Routes>
        <Route path="/"
          element={<Home posts={posts}/>}>
        </Route>
        <Route path="/login" element={<Login/>}>
          
        </Route>
        <Route path="/about" element={ <About />}>
         
        </Route>
        </Routes>
      </Router> 
    </div>
  );
}


