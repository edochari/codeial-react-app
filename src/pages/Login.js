 import styles from '../styles/login.module.css';
 import { useToasts } from 'react-toast-notifications';
 import { useState } from 'react';
import { redirect } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import { useAuth } from '../hooks';
 const Login=()=>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loggingin,setLoggingin]=useState(false);
    const {addToast}=useToasts();
    const navigate=useNavigate();
    const auth=useAuth();

    console.log(auth);
    const handleSubmit=async (e)=>{
      e.preventDefault();

       setLoggingin(true);

       if(!email || !password)
       {
        return addToast("please enter both email and password",
        {
            appearance:'error'
        })
       }

       const response = await auth.login(email,password);

       if(response.success)
       {
        return addToast("successfully logged in",{
            appearance:'success'
        })
       }else{
        return addToast(response.message,{
            appearance:'error'
        })
       }
    }
    if(auth.user){
      return navigate("/");
    }
    return (
       <form className={styles.loginForm} onSubmit={handleSubmit}>
           <span className={styles.loginSignupHeader}></span>

           <div className={styles.field}>
              <input type="email" placeholder='Email' value={email} 
              onChange={(e)=>setEmail(e.target.value)}/>
           </div>
           <div className={styles.field}>
              <input type="password" placeholder='password' value={password} 
              onChange={(e)=>setPassword(e.target.value)}/>
           </div>
           <div className={styles.field} >
              <button disabled={loggingin} >
                {loggingin ? "logging in ...":"Log In"}</button>
           </div>

       </form>
    )
}

export default Login;