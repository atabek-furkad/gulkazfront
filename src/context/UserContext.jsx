import { createContext, useReducer } from 'react'
import initialState from '../initialStates/initialUserState'
import UserReducer from '../reducers/UserReducer'

const UserContext = createContext({})

export const UserDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState)
  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
