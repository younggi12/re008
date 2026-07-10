import React from 'react'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'

const Board = () => {
  return (
    <main>
        <h2>React CRUD 게시판 </h2>
        {/* 새 게시글 입력 */}
        <PostForm />

        {/* 게시글 전체 목록 */}
        <PostList />
    </main>
  )
}

export default Board
