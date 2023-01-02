import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'

const Product = ({ product }) => {
  const { state } = useContext(UserContext)

  const handleFormSubmit = async (id) => {
    const config = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${state.userInfo.token}`,
      },
    }
    await fetch(`https://gulkazapi.onrender.com/api/products/${id}`, config)
  }

  // const showImages = product.images.map((image) => image.slice(15))

  return (
    <div>
      <form
        onSubmit={() => {
          handleFormSubmit(product._id)
        }}
      >
        {/* <Link to={`/products/${product._id}`}>{product.name}</Link> */}

        {/* {showImages?.slice(0, 1).map((image, index) => (
          <img src={image} alt="product" key={index} height="100" />
        ))} */}

        <Link to={`/profile/edit-product/${product._id}`}>Edit</Link>
        <button>Delete</button>
      </form>
    </div>
  )
}

export default Product
