import axios from 'axios';
import React, {useState, useEffect} from 'react';
import CommentList from './CommentList';
import CreateComment from './CreateComment';

const PostList = () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const {data: newPosts} = await axios.get('http://posts.com/posts');
        setPosts(newPosts);
    }
    useEffect(() => {
        fetchPosts()
    }, []);

    return <div className='container'>
        {
            Object.values(posts).map(({title, id, comments}, index) => (
                <div className='card my-3 p-3 border-1' key={index}>
                    <div className='card-title'>
                        {title}
                    </div>
                    <div className='card-body'>
                        <CommentList comments={comments}/>
                        <CreateComment postId={id} />
                    </div>
                </div>
            ))
        }
    </div>
}

export default PostList;