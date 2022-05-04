import React, { useState } from 'react';
import axios from 'axios';

const PostForm = () => {
    const [title, setTitle] = useState('');

    const onSumbitHandler = async (e) => {
        e.preventDefault();
        await axios.post('http://posts.com/posts/create', {title});
        setTitle('');
    }

    return <form onSubmit={onSumbitHandler}>
        <div className='form-group my-3'>
            <label>Title</label>
            <input className='form-control' type='text' placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <button className='btn btn-info'>Sumbit</button>
    </form>
}

export default PostForm;