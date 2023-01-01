import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import UserContext from '../context/UserContext'

const ProductPage = () => {
  const { state } = useContext(UserContext)
  const params = useParams()

  const [imagePath, setImagePath] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${state.userInfo.token}`,
        },
      }
      const { data } = await axios.get(`/api/products/${params.id}`, config)
      await setImagePath(data)
      console.log('Data', imagePath)
    }

    fetchData()
  }, [params.id])

  return (
    <div className="ProductPage">
      <img src={imagePath} width="100" />
    </div>
  )
}

export default ProductPage
