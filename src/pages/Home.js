import PropTypes from 'prop-types';
import styles from '../styles/home.module.css';
import { Comments } from '../components/Comments';
import { useState, useEffect } from 'react';
import { getPosts } from '../api';
import { Loader } from '../components/Loader';
import { Link } from 'react-router-dom';
export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();

      console.log("response", response);
      if (response.success) {
        setPosts(response.data.posts);
      }
      setLoading(false);
      console.log("posts", posts);
    }
    fetchPosts();
  }, []);
  if (loading) {
    return <Loader />
  }
  return (
    <div className={styles.postsList}>
      {posts.map((post) => (
        // {console.log("posts map",post.user)}
        <div className={styles.postWrapper} key={`post-${post._id}`}>
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
           

              <div>
                <Link to={{
                  pathname: `/user/${post.user._id}`,
                  state: {
                    user: post.user,
                  },
                }} className={styles.postAuthor}>{post.user.name}</Link>
                <span className={styles.postTime}>a minute ago</span>
              </div>
            </div>
            <div className={styles.postContent}>{post.content}</div>

            <div className={styles.postActions}>
              <div className={styles.postLike}>
               
                <span>5</span>
              </div>

              <div className={styles.postCommentsIcon}>
               
                <span>2</span>
              </div>
            </div>
            <div className={styles.postCommentBox}>
              <input placeholder="Start typing a comment" />
            </div>

            <div className={styles.postCommentsList}>
              {post.comments.map((comment) => {
                <Comments comments={comment} />
              })}
            </div>
          </div>
        </div>
      ))};
    </div>
  );
};

Home.propTypes = {
  posts: PropTypes.array.isRequired,
}
export default Home;


