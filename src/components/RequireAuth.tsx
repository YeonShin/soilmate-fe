import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { useAuthStore } from '../store/useAuthStore'

const RequireAuth = () => {
  const {token} = useAuthStore();
  const navigate = useNavigate(); 
  // 인증 확인 관련 로직
  useEffect(() => {
    if (token === null) {
      navigate('/login')
    }
  }, [token])

  // 로그인 됨 -> 자식 페이지 라우팅
  return (
    <Outlet />
  )
}

export default RequireAuth
