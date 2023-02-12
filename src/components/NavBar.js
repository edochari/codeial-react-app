import styles from '../styles/navbar.module.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks'

export const NavBar=()=>{
    const auth=useAuth();
    return (
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <a href="/">
                    <img />
                </a>
            </div>
            <div className={styles.rightNav}>
                {auth.user && <div className={styles.user}>
                    <a href="/">
                        <img className={styles.userDp}/>
                    </a>
                    <span>{auth.user.name}</span>
                </div>}
            </div>
            <div className={styles.navLinks}>
                <ul>{auth.user?(
                    <>
                    <li onClick={auth.logout}>
                       Log out
                    </li>
                    <li>
                            <Link to="/settings">Settings</Link>
                        </li>
                    </>):(
                        <>
                        <li>
                            <Link to="/settings">Settings</Link>
                        </li>
                    <li>
                        <Link to="/login">Log in</Link>
                    </li>
                    <li>
                        <Link to="/signup">Register</Link>
                    </li>
                    </>)}
                </ul>
            </div>
        </div>
    )
}