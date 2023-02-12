import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthProvider } from "../providers/AuthProvider";
import { fetchUserFriends, login as userLogin } from "../api";
import { setItemInLocalStorage,LOCALSTORAGE_TOKEN_KEY, removeItemFromLocalStorage, getItemFromLocalStorage } from "../utils";
import { register} from "../api";
import { editProfile } from "../api";
import jwtDecode from "jwt-decode";

export const useAuth=()=>{
    return useContext(AuthContext);
}
export const useProvideAuth=()=>{

    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(false);
    
    useEffect(()=>{
      const getUser=async ()=>{
        const userToken=getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

        if(userToken)
        {
            const user=jwtDecode(userToken);
            const response=await fetchUserFriends();
            let friends=[];
            console.log("friends",response);
            if(response.success)
            {
              friends=response.data.friends;
            }
            else{
              friends=[];
            }
            setUser({
              ...user,
              friends
            });
        }
        setLoading(false);
      }
      getUser();
        
    },[]);
    const login=async (email,password)=>{
       const response=await userLogin(email,password);

       if(response.success)
       {
        setUser(response.data.user);
        setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY,response.data.token?response.data.token:null);
        return {
            success:true
        }
       }else{
        return {
        success:false,
        message:response.message
        }
       }
    };

    const logout=()=>{
        setUser(null);
        removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    };
    const updateUser=async (userId,name, password, confirmPassword)=>{
      const response = await editProfile(userId,name, password, confirmPassword);
        console.log("response",response);
        if (response.success) {
          setUser(response.data.user);
          setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY,
            response.data.token?response.data.token:null);
          return {
            success: true,
          };
        } else {
          return {
            success: false,
            message: response.message,
          };
        }
    }
    const signup = async (name, email, password, confirmPassword) => {
        const response = await register(name, email, password, confirmPassword);
    
        if (response.success) {
          return {
            success: true,
          };
        } else {
          return {
            success: false,
            message: response.message,
          };
        }
      };

    return {
        login,
        logout,
        signup,
        user,
        loading,
        updateUser
    }
};