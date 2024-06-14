import { useParams } from 'react-router-dom'
import './ProductDetails.css'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import RightSide from './rightSide/RightSide'
import LeftSIde from './leftSide/LeftSIde'
import Spinner from '../../components/spinner/Spinner'
import ProductDescription from './productDescription/ProductDescription'
import Sidebar from '../../components/sidebar/Sidebar'



const ProductDetails = () => {
  const { id } = useParams()
  const baseURL = "https://fakestoreapi.com/products"
  const [product, setProduct] = useState({})
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)




  const getProductById = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${baseURL}/${id}`)
      setProduct(response.data)
      setError(null)
      setIsLoading(false)
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }, [baseURL, id])


  useEffect(() => {
    getProductById()
  }, [getProductById])


  return (
    <>
      {product.id && !error && (
        <div className='container'>
          <p className=''>{product?.category?.toUpperCase()}</p>
          {product?.id && (
            <div className='d-flex flex-column flex-md-row justify-content-between '>
              <LeftSIde product={product} />
              <RightSide product={product} />
            </div>
          )}
          <ProductDescription description={product.description} />
        </div>
      )}

      {!product.id && !error && !isLoading && (
        <div className='container d-flex justify-content-center align-items-start'>
          <div className="alert alert-danger col-12">
            No Product To Show
          </div>
        </div>
      )}

      {isLoading && (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
          <Spinner />
        </div>
      )}

      {!!product.id && error && (
        <div className='alert alert-danger'>{error}</div>)
      }
    </>
  )
}

export default ProductDetails
