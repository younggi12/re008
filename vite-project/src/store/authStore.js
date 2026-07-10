import { create } from "zustand"
import { signOutWithFirebase,
         signInwithEamil,
         signUpWithEmail,
         subscribeAuthState
} from '../services/firebaseAuth'

const mapUser = (user) => {
    if(!user){
        return null 
    }

    return {
        uid : user.uid,
        email : user.email
    }
}

const useAuthStore = create( (set) =>({
    user:null,
    initialized:false,
    loading:false,
    error:'',

    // 로그인 실시간 상태 감지 
    listenAuthState: () => {
        return  subscribeAuthState( (user) => {
            set({
                user: mapUser(user),
                initialized:true,
            })
        })
    },


    // 회원가입
    signUp: async ({email, password}) => {
        set({loading : true, error:'' })
        try{
            const user = await signUpWithEmail({email,password})
            set({ user : mapUser(user), loading : false })
        }catch(err){
            set( {error : err, loading : false } )
            throw err 
        }
    },

    // 로그인

    // 로그아웃

}))

export default useAuthStore