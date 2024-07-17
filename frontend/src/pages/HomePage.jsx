import React from 'react'
import Header from '../components/Header'
import UserProfile from '../components/UserProfile'
import { useSelector } from 'react-redux'

function HomePage() {
  const { userInfo } = useSelector((state)=>state.auth)
  return (
    <>
    <Header/>
    <UserProfile/>
    </>
  )
}

export default HomePage