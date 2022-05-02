import React from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

const App = () => {
    return <div className='container'>
        <PostForm />
        <PostList />
    </div>
}

export default App;