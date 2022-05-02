import React, {useState} from 'react';
import axios from 'axios';

const CreateComment = ({postId}) => {
    const [comment, setComment] = useState('');

    const onSumbitHandler = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
            content: comment
        });
        setComment('');
    }

    return <div>
        <form onSubmit={onSumbitHandler}>
            <div className='form-group'>
                <label >
                    Write Comment
                </label>
                <input type='text' style={{marginRight: '1rem'}} placeholder='Comment' value={comment} onChange={(e) => {setComment(e.target.value)}} />
            </div>
            <button className='btn btn-info'>
                comment
            </button>
        </form>
    </div>
}

export default CreateComment;