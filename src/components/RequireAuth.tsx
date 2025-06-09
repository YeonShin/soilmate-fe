import React from 'react'
import { Outlet } from 'react-router'

const RequireAuth = () => {

  // 인증 확인 관련 로직

  // 로그인 됨 -> 자식 페이지 라우팅
  return (
    <Outlet />
  )
}

export default RequireAuth
