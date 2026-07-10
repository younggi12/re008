import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import useAuthStore from './store/authStore'

import Board from './pages/Board'
import Detail from './pages/Detail'
import AuthForm from './components/AuthForm'
import './App.scss'

const App = () => {
  const user = useAuthStore((state) => state.user)
  const initialized = useAuthStore((state) => state.initialized)
  const listenAuthState = useAuthStore((state) => state.listenAuthState)
  const signOut = useAuthStore((state) => state.signOut)

  useEffect(() => {
    const unsubscribe = listenAuthState()

    // 실시간 감지를 정리 
    return unsubscribe
  }, [listenAuthState])

  return (
    <div className='app'>
      <header className='app__header'>
        {user ? (
          <div className='app__user'>
            <p>{user.email}</p>
            <button onClick={signOut}>로그아웃</button>
          </div>
        ) : initialized ? (
          <AuthForm />
        ) : (
          <p className='app__loading'>로그인 상태 확인중...</p>
        )}
      </header>

      <section className='app__content'>
        <Routes>
          <Route path='/' element={<Board />} />
          <Route path='/detail/:id' element={<Detail />} />
        </Routes>
      </section>
    </div>
  )
}

export default App
