import React from 'react'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'

const Board = () => {
    return (
        <main className='board'>
            <div className='board__title'>
                <p>Firestore Board</p>
                <h2>React CRUD 게시판</h2>
            </div>

            <PostForm />
            <PostList />
        </main>
    )
}

export default Board
