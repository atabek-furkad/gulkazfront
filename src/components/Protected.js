import { Navigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import { useContext } from 'react'

const Protected = ({ children }) => {
  const { state } = useContext(UserContext)
  if (!state.userInfo?.isAdmin) {
    return <Navigate to="/" replace />
  }
  return children
}
export default Protected
