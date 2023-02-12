import styles from "../styles/settings.module.css"
import { useAuth } from "../hooks";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserProfile } from "../api";
import { useToasts } from "react-toast-notifications";
import { useNavigate} from "react-router-dom";
import { Loader } from "../components/Loader";
const UserProfile=()=>{
   const [user,setUser]=useState({});
   const [loading,setLoading]=useState(false);
   const {userId}=useParams();
   const {addToast}=useToasts();
   console.log('user Id',userId);
   const navigate=useNavigate();
    const auth=useAuth();
    console.log("authenticate",auth);
   useEffect(()=>{
    const getUser=async ()=>{
      const response=await getUserProfile(userId);
      if(response.success)
      {
        setUser(response.data.user);
      }
      else
      {
         addToast(response.message,
            {appearence:'error'})
        navigate('/');
      }
    }
    getUser();
   },[userId,navigate,addToast])
   const checkIfUserIsAFriend=()=>{
    // const friends=auth.user.friends;
    // const friendIds=friends.map(friend=>friend.to_user._id);
    // const index=friendIds.indexOf(userId);
    // if(index !== -1)
    // {
    //     return true;
    // }
    // return false;

   }
   if(loading)
   {
    return (<Loader/>);
   } 
     return (
        <div className={styles.settings}>
            <div className={styles.imgContainer}>
                <img
                src=""
                alt="" 
                />
            </div>
            <div className={styles.field}>
                <div className={styles.fieldLabel}>
                Email
                </div>
                <div className={styles.fieldValue}>
                {user.email}
                
                </div>
            </div>
            <div className={styles.field}>
                <div className={styles.fieldLabel}>
                Name
                </div>
                <div className={styles.fieldValue}>
                {user.name}
                
                </div>
            </div>
            {checkIfUserIsAFriend()?
            (<div className={styles.btnGrp}>
                <button className={`button ${styles.saveBtn}`} >Remove Friend</button>
            </div>):(
            <div className={styles.btnGrp}>
                <button className={`button ${styles.saveBtn}`} >Add Friend</button>
            </div>)}
            
        </div>
     )
}

export default UserProfile;