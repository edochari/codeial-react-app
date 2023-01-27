import styles from '../styles/home.module.css';

export const Comments=({comments})=>{
    return (
        <div className={styles.postCommentsItem}>
                <div className={styles.postCommentHeader}>
                      <span className={styles.postCommentAuthor}>{comments.data}</span>
                      <span className={styles.postCommentTime}>a minute ago</span>
                      <span className={styles.postCommentLikes}>22</span>
                </div>
      
                <div className={styles.postCommentContent}>{comments.content}</div>
        </div>
    )
}