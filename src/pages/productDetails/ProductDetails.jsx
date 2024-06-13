import { useNavigate, useParams } from 'react-router-dom'
import './ProductDetails.css'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import Rating from '../../components/rating/Rating'
const ProductDetails = () => {
  const { id } = useParams()
  console.log({ id })
  const baseURL = "https://fakestoreapi.com/products"
  const [product, setProduct] = useState({})
  const [error, setError] = useState({})
  let navigate = useNavigate()


  const getProductById = useCallback(async () => {
    try {
      const response = await axios.get(`${baseURL}/${id}`)
      setProduct(response.data)
    } catch (err) {
      setError(err.message)
    }
  }, [baseURL, id])


  useEffect(() => {
    getProductById()
  }, [getProductById])

  return (
    <div className='container'>

      <p className=''>{product?.category?.toUpperCase()}</p>
      {product?.id && (
        <div className='d-flex justify-content-between '>
          <div className="right d-flex flex-column justify-content-center align-items-center col-md-8 bg-secondary border relative" style={{ height: '600px', background: 'rgb(245,243,241)' }}>
            <img src={product?.image} alt={product?.title} style={{ width: '450px', height: '450px' }} />
          </div>
          <div className="left d-flex flex-column justify-content-start  col-md-4 px-md-2">
            <h5>{product?.title}</h5>
            <Rating {...product?.rating} />
            <p style={{ fontSize: '1.5rem' }}>${product?.price}</p>
          </div>
        </div>
      )}
      {/* {!!product.id && error && (<div className='alert alert-danger'>{error}</div>)} */}
    </div>
  )
}

export default ProductDetails