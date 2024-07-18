import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoute() {
    const { adminInfo } = useSelector((state)=> state.adminAuth)
  return adminInfo ? <Outlet/> : <Navigate to="/admin/login" />
}
