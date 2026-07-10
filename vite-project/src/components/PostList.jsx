import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import usePostStore from '../store/postStore'

const PostList = () => {
    const posts = usePostStore((state) => state.posts)
    const deletePost = usePostStore((state) => state.deletePost)
    const loading = usePostStore((state) => state.loading)
    const error = usePostStore((state) => state.error)
    const fetchPosts = usePostStore((state) => state.fetchPosts)

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    return (
        <section className='post-list'>
            <div className='post-list__head'>
                <h3>게시글 목록</h3>
                <span>총 {posts.length}개</span>
            </div>

            {error && <p className='post-list__message'>{error}</p>}
            {loading && <p className='post-list__message'>불러오는 중입니다...</p>}

            {
                posts.length === 0 ? (
                    <div className='post-list__empty'>등록된 게시글이 없습니다</div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <Link to='/detail' state={{ id: item.id }}>
                                                    {item.title}
                                                </Link>
                                            </td>
                                            <td>{item.writer}</td>
                                            <td>
                                                <Link to='/detail' state={{ id: item.id }}>
                                                    수정
                                                </Link>
                                                <button onClick={() => { deletePost(item.id) }}>
                                                    삭제
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                )
            }
        </section>
    )
}

export default PostList
