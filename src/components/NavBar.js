import styles from '../styles/navbar.module.css'

export const NavBar=()=>{
    return (
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <a href="/">
                    <img />
                </a>
            </div>
            <div className={styles.rightNav}>
                <div className={styles.user}>
                    <a href="/">
                        <img className={styles.userDp}/>
                    </a>
                    <span>Hari</span>
                </div>
            </div>
            <div className={styles.navLinks}>
                <ul>
                    <li>
                        <a href="/">Log in</a>
                    </li>
                    <li>
                        <a href="/">Log out</a>
                    </li>
                    <li>
                        <a href="/">Register</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}