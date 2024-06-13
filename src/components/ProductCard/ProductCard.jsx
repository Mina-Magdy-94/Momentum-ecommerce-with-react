/* eslint-disable react/no-unescaped-entities */
import { useDispatch, useSelector } from 'react-redux'
import './ProductCard.css'
import { cartActions } from '../../store/slices/cartSlice'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ product }) => {
    // Global state variables
    const { cartList } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const { addToCart, removeFromCard } = cartActions

    // component variables
    const [isProductInShoppingCart, setIsProductInShoppingCart] = useState(false)
    const { id, title, price, image } = product

    // navigator variable
    const navigate = useNavigate()

    const changeProductCartStatus = (productId) => {
        if (!isProductInShoppingCart) {
            dispatch(addToCart({ ...product, count: 1 }))
        } else {
            dispatch(removeFromCard(productId))
        }
        setIsProductInShoppingCart((prevState) => !prevState)
    }

    const viewDetails = (productId) => {
        navigate(`/products/${id}`)
    }

    return (
        <div className="p-2 col-12 col-md-6 col-lg-4">
            <div className="d-flex flex-column justify-content-between border" style={{ height: '600px' }}>
                <img src={image} className="card-img-top" alt="..." style={{ objectFit: 'cover', width: '100%', height: '400px' }} />
                <div className="d-flex flex-column justify-content-between p-2" style={{ height: '180px' }}>
                    <h5 className="card-title">{title}</h5>
                    <h5>Price : <span className='cart-price'>${price}</span></h5>
                    <button className={`cart-btn ${isProductInShoppingCart ? 'remove-btn' : 'add-btn'}`} onClick={() => changeProductCartStatus(id)}>{isProductInShoppingCart ? 'Remove From' : 'Add To'} Cart</button>
                    <button className={`cart-btn view-btn`} onClick={() => viewDetails(id)}>View Details</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
