import React, { useContext } from 'react'
import UserContext from '../context/UserContext'
// import ProductsList from '../components/ProductsList'

const HomePage = () => {
  const { state } = useContext(UserContext)

  console.log('in home page', state)
  return (
    <div className="HomePage">
      <h1>Home Page</h1>
      {/* <ProductsList /> */}
    </div>
  )
}

export default HomePage
