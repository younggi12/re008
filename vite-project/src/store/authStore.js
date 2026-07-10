import { create } from 'zustand'
import {
    signOutWithFirebase,
    signInwithEamil,
    signUpWithEmail,
    subscribeAuthState,
} from '../services/firebaseAuth'

const mapUser = (user) => {
    if (!user) {
        return null
    }

    return {
        uid: user.uid,
        email: user.email,
    }
}

const useAuthStore = create((set) => ({
    user: null,
    initialized: false,
    loading: false,
    error: '',

    listenAuthState: () => {
        return subscribeAuthState((user) => {
            set({
                user: mapUser(user),
                initialized: true,
            })
        })
    },

    signUp: async ({ email, password }) => {
        set({ loading: true, error: '' })

        try {
            const user = await signUpWithEmail({ email, password })
            set({ user: mapUser(user), loading: false })
        } catch (err) {
            set({ error: err.message, loading: false })
            throw err
        }
    },

    signIn: async ({ email, password }) => {
        set({ loading: true, error: '' })

        try {
            const user = await signInwithEamil({ email, password })
            set({ user: mapUser(user), loading: false })
        } catch (err) {
            set({ error: err.message, loading: false })
            throw err
        }
    },

    signOut: async () => {
        set({ loading: true, error: '' })

        try {
            await signOutWithFirebase()
            set({ user: null, loading: false })
        } catch (err) {
            set({ error: err.message, loading: false })
            throw err
        }
    },
}))

export default useAuthStore
