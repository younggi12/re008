import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import usePostStore from '../store/postStore'

const PostList = () => {
    const [keyword, setKeyword] = useState('')
    const [sortMode, setSortMode] = useState('latest')
    const posts = usePostStore((state) => state.posts)
    const deletePost = usePostStore((state) => state.deletePost)
    const loading = usePostStore((state) => state.loading)
    const error = usePostStore((state) => state.error)
    const fetchPosts = usePostStore((state) => state.fetchPosts)

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    const visiblePosts = useMemo(() => {
        const filteredPosts = posts.filter((post) => {
            const searchText = `${post.title} ${post.writer} ${post.content}`.toLowerCase()
            return searchText.includes(keyword.trim().toLowerCase())
        })

        return [...filteredPosts].sort((a, b) => {
            const aTime = new Date(a.createdAt || 0).getTime()
            const bTime = new Date(b.createdAt || 0).getTime()
            return sortMode === 'latest' ? bTime - aTime : aTime - bTime
        })
    }, [keyword, posts, sortMode])

    return (
        <section className='post-list'>
            <div className='post-list__head'>
                <div>
                    <span>Browse</span>
                    <h3>게시글 목록</h3>
                </div>
                <p>총 {posts.length}개</p>
            </div>

            <div className='post-list__toolbar'>
                <input
                    type='search'
                    placeholder='제목, 작성자, 내용 검색'
                    value={keyword}
                    onChange={(e) => {
                        setKeyword(e.target.value)
                    }}
                />

                <div className='post-list__sort'>
                    <button
                        type='button'
                        className={sortMode === 'latest' ? 'is-active' : ''}
                        onClick={() => {
                            setSortMode('latest')
                        }}
                    >
                        최신순
                    </button>
                    <button
                        type='button'
                        className={sortMode === 'oldest' ? 'is-active' : ''}
                        onClick={() => {
                            setSortMode('oldest')
                        }}
                    >
                        오래된순
                    </button>
                </div>
            </div>

            {error && <p className='post-list__message'>{error}</p>}
            {loading && <p className='post-list__message'>불러오는 중입니다...</p>}

            {
                visiblePosts.length === 0 ? (
                    <div className='post-list__empty'>
                        {keyword ? '검색 결과가 없습니다' : '등록된 게시글이 없습니다'}
                    </div>
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
                                visiblePosts.map((item, index) => {
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
