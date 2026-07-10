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
        <section>
            <h3>게시글 목록</h3>
            {error && <p>{error}</p>}
            {loading && <p>불러오는 중입니다...</p>}
            {
                posts.length === 0 ? (
                    <h3>등록된 게시글이 없습니다</h3>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>비고</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td><Link to={`/detail/${item.id}`}>{item.title}</Link></td>
                                            <td>{item.writer}</td>
                                            <td>
                                                <Link to={`/detail/${item.id}`}>수정</Link>
                                                <button onClick={() => { deletePost(item.id) }}>삭제</button>
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
