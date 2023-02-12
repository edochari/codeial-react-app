import styles from "../styles/settings.module.css"
import { useAuth } from "../hooks";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";
const Settings=()=>{
   
    const auth=useAuth();
    const [editMode,setEditMode] = useState(false);
    const [name,setName] = useState(auth.user?.name?auth.user.name:'');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [savingForm,setSavingForm] = useState(false);
    const {addToast}=useToasts();
    const clearForm=()=>{
        setConfirmPassword('');
        setPassword('');
    }
    const updateProfile=async ()=>{
       setSavingForm(true);
       let error=false;
       if(!name || !password || !confirmPassword){
        addToast("Please fill all fields",{
            appearence:'error',
        })
        error=true;
       }

       if(password !== confirmPassword){
        addToast("password and confirm password did not match",{
            appearence:'error'
        })
        error=true;
       }
       if(error)
       {
        return setSavingForm(false);
       }

       const response=await auth.updateUser(auth.user._id,name,password,confirmPassword);
       console.log("response",response);
       if(response.success)
       {
        setSavingForm(false);
        setEditMode(false);
        clearForm();

        return addToast("Profile updated successfully",
        {
            appearence:'success',
        })
       }else{
        return addToast(response.message,
        {
            appearence:'error',
        })
       }
       setSavingForm(false);
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
                {auth.user?.email}
                
                </div>
            </div>
            <div className={styles.field}>
                <div className={styles.fieldLabel}>
                Name
                </div>
                {editMode?(
                    <input 
                      type="text"
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                      />
                ):(
                <div className={styles.fieldValue}>
                {auth.user?.name}
                </div>)}
            </div>
            {editMode?
            (
            <><div className={styles.field}>
                <div className={styles.fieldLabel}>
                password
                </div>
                <input type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div className={styles.field}>
                <div className={styles.fieldLabel}>
                confirm password
                </div>
                <input type="password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)} />
            </div>
            </>):(<></>)}
            {editMode?(
                <>
                <div className={styles.btnGrp}>
                <button className={`button ${styles.saveBtn}`} disabled={savingForm} onClick={updateProfile}> {savingForm?"Saving Form...":"Save"}</button>
            </div>
            <div className={styles.btnGrp}>
            <button className={`button ${styles.editBtn}`} onClick={()=>setEditMode(false)}> Go back</button>
        </div></>
                ):(
            <div className={styles.btnGrp}>
                <button className={`button ${styles.editBtn}`} onClick={()=>setEditMode(true)}> Edit Profile</button>
            </div>)}
        </div>
     )
}

export default Settings;