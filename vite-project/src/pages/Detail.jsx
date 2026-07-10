import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import usePostStore from '../store/postStore'

const Detail = () => {
    const { id } = useParams()
    const posts = usePostStore((state) => state.posts)
    const updatePost = usePostStore((state) => state.updatePost)

    const post = posts.find((item) => {
        return item.id === id
    })

    const [isEdit, setIsEdit] = useState(false)
    const [title, setTitle] = useState(post ? post.title : '')
    const [writer, setWriter] = useState(post ? post.writer : '')
    const [content, setContent] = useState(post ? post.content : '')

    const updatefunc = async () => {
        if (title.trim() === '' || writer.trim() === '' || content.trim() === '') {
            alert('모든 내용을 입력해주세요')
            return
        }

        try {
            await updatePost({
                id: post.id,
                title,
                writer,
                content,
            })

            setIsEdit(false)
        } catch (error) {
            alert(error.message)
        }
    }

    if (!post) {
        return (
            <div>
                <h2>게시글이 없습니다</h2>
                <Link to='/'>목록으로</Link>
            </div>
        )
    }

    return (
        <div>
            <h2>게시글 상세보기</h2>
            <hr />
            {
                isEdit ? (
                    <>
                        <p><strong>번호 : </strong>{post.id}</p>
                        <input
                            type='text'
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                        />
                        <input
                            type='text'
                            value={writer}
                            onChange={(e) => {
                                setWriter(e.target.value)
                            }}
                        />
                        <textarea
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value)
                            }}
                        />

                        <br /><br />
                        <button onClick={updatefunc}>저장</button>
                        <button
                            onClick={() => {
                                setTitle(post.title)
                                setWriter(post.writer)
                                setContent(post.content)
                                setIsEdit(false)
                            }}
                        >
                            취소
                        </button>
                    </>
                ) : (
                    <>
                        <p><strong>번호</strong> : {post.id}</p>
                        <p><strong>제목</strong> : {post.title}</p>
                        <p><strong>작성자</strong> : {post.writer}</p>
                        <p><strong>내용</strong></p>
                        <div>{post.content}</div>

                        <br /><br />
                        <button
                            onClick={() => {
                                setIsEdit(true)
                            }}
                        >
                            수정
                        </button>
                        <Link to='/'>목록으로</Link>
                    </>
                )
            }
        </div>
    )
}

export default Detail
