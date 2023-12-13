import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

const VerifyAdmin = () => {
  const {currentUser} = useSelector(state => state.user)

  console.log(currentUser?.role);
  return currentUser?.role !== 'Admin' ? <Navigate to='/sign-in' /> : <Outlet /> 
}   

export default VerifyAdmin;