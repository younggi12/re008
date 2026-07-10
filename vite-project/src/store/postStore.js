import { create } from 'zustand'
import {
    updatePostInFirestore,
    deletePostFromFirestore,
    addPostTOfirestore,
    fetchPostsFromFirestors,
} from '../services/firestorePosts'

const getPostErrorMessage = (error) => {
    if (error.code === 'permission-denied') {
        return '게시글 권한이 없습니다. Firebase rules를 확인해주세요.'
    }

    return error.message
}

const usePostStore = create((set) => ({
    posts: [],
    loading: false,
    error: '',

    fetchPosts: async () => {
        set({ loading: true, error: '' })

        try {
            const posts = await fetchPostsFromFirestors()
            set({ posts, loading: false })
        } catch (error) {
            set({ error: getPostErrorMessage(error), loading: false })
            throw error
        }
    },

    addPost: async (newPost) => {
        set({ loading: true, error: '' })

        try {
            const aPost = await addPostTOfirestore(newPost)
            set((state) => ({
                posts: [aPost, ...state.posts],
                loading: false,
            }))
        } catch (error) {
            set({ error: getPostErrorMessage(error), loading: false })
            throw error
        }
    },

    deletePost: async (id) => {
        set({ loading: true, error: '' })

        try {
            await deletePostFromFirestore(id)
            set((state) => ({
                posts: state.posts.filter((item) => item.id !== id),
                loading: false,
            }))
        } catch (error) {
            set({ error: getPostErrorMessage(error), loading: false })
            throw error
        }
    },

    updatePost: async (updatePost) => {
        set({ loading: true, error: '' })

        try {
            const savePost = await updatePostInFirestore(updatePost)
            set((state) => ({
                posts: state.posts.map((item) => (
                    item.id === savePost.id ? savePost : item
                )),
                loading: false,
            }))
        } catch (error) {
            set({ error: getPostErrorMessage(error), loading: false })
            throw error
        }
    },
}))

export default usePostStore
