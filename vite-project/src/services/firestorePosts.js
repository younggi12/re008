import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
} from 'firebase/firestore'
import { db } from '../firebase.js'

const postsRef = collection(db, 'posts')

const mapDocumentToPost = (document) => {
    const data = document.data()

    return {
        id: document.id,
        title: data.title || '',
        writer: data.writer || '',
        content: data.content || '',
        uid: data.uid || '',
        createdAt: data.createdAt?.toDate?.().toISOString?.() || '',
        updatedAt: data.updatedAt?.toDate?.().toISOString?.() || '',
    }
}

export const fetchPostsFromFirestors = async () => {
    const postsQuery = query(postsRef, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(postsQuery)

    return snapshot.docs.map(mapDocumentToPost)
}

export const addPostTOfirestore = async (post) => {
    const document = await addDoc(postsRef, {
        title: post.title,
        writer: post.writer,
        content: post.content,
        uid: post.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    })

    return {
        id: document.id,
        ...post,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
}

export const deletePostFromFirestore = async (id) => {
    await deleteDoc(doc(db, 'posts', id))
}

export const updatePostInFirestore = async (post) => {
    const postRef = doc(db, 'posts', post.id)

    await updateDoc(postRef, {
        title: post.title,
        content: post.content,
        updatedAt: serverTimestamp(),
    })

    return {
        ...post,
        updatedAt: new Date().toISOString(),
    }
}
