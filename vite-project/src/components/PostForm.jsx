import React, { useState } from 'react'
import usePostStore from '../store/postStore'
import useAuthStore from '../store/authStore'

const PostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const user = useAuthStore((state) => state.user)
    const addPost = usePostStore((state) => state.addPost)
    const loading = usePostStore((state) => state.loading)

    const submitB = async () => {
        if (!user) {
            alert('로그인 후 글을 작성해주세요')
            return
        }

        if (title.trim() === '' || content.trim() === '') {
            alert('모든 내용을 입력해주세요')
            return
        }

        try {
            await addPost({
                title,
                writer: user.email,
                content,
                uid: user.uid,
            })

            setTitle('')
            setContent('')
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className='post-form'>
            <div className='post-form__head'>
                <h3>새 글 작성</h3>
                <span>{user ? user.email : '로그인이 필요합니다'}</span>
            </div>

            <input
                type='text'
                placeholder='제목을 입력하세요'
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
            />

            <textarea
                placeholder='내용을 입력하세요'
                value={content}
                onChange={(e) => {
                    setContent(e.target.value)
                }}
            />

            <button onClick={submitB} disabled={loading}>
                {loading ? '등록중...' : '등록'}
            </button>
        </div>
    )
}

export default PostForm
