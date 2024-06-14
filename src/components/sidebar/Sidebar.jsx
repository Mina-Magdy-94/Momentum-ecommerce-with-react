import { useDispatch, useSelector } from "react-redux";
import "./Sidebar.css"
import { IoMdClose } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { cartActions } from "../../store/slices/cartSlice";
import { decreaseProductCountByOneThunk } from "../../store/slices/cartSlice"

const Sidebar = ({ isSidebarOpen, closeNav }) => {
    const { cartList } = useSelector(state => state.cart)
    const cartCount = cartList.map(prod => prod.count).reduce((prev, count) => prev + count, 0);
    const totalPrice = cartList.map(prod => prod.price * prod.count).reduce((prev, count) => prev + count, 0);
    const { removeFromCard, increaseProductCountByOne } = cartActions

    const dispatch = useDispatch()



    const removeProduct = (productId) => {
        dispatch(removeFromCard(productId))
    }

    const decreaseByOne = (productId) => {
        dispatch(decreaseProductCountByOneThunk(productId));
    }

    const increaseByOne = (productId) => {
        dispatch(increaseProductCountByOne(productId))
    }

    return (
        <>
            <div className="parent d-flex justify-content-start ">
                <div className={`left overlay ${isSidebarOpen ? '' : 'invisible'}`}></div>
                <aside
                    className={`right bg-dark text-light ${isSidebarOpen ? '' : 'invisible'}`
                    }
                >

                    {/* first row */}
                    <div className="first-row d-flex justify-content-between align-items-center">
                        <div className="item-count d-flex justify-content-start gap-2 align-items-center">
                            <span className="fs-2 fw-semibold">Cart</span>
                            <span>{cartCount} items</span>
                        </div>
                        <IoMdClose size={30} onClick={closeNav} style={{ cursor: 'pointer' }} />
                    </div>
                    <hr />


                    {cartCount && (
                        <>
                            {/* second row */}
                            <div className="second-row">
                                {cartList.length && cartList.map((item, index) => {
                                    return (
                                        <div key={item.id} className="product-item">
                                            <div className="item-left">
                                                <img src={item.image} alt={`product ${index + 1}`} height="55" />
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <CiCircleMinus size={25} style={{ cursor: 'pointer' }} onClick={() => decreaseByOne(item.id)} />
                                                    <span>{item.count}</span>
                                                    <CiCirclePlus size={25} style={{ cursor: 'pointer' }} onClick={() => increaseByOne(item.id)} />
                                                </div>
                                            </div>
                                            <div className="item-right">
                                                {/* row one in the right div */}
                                                <div className="row-1 d-flex justify-content-between align-items-start">
                                                    <h6>{item.title}</h6>
                                                    <span>${item.price}</span>
                                                </div>
                                                {/* row two in the right div */}
                                                <div className="row-2 d-flex justify-content-between align-items-start">
                                                    <span style={{ fontSize: '10px' }}>In stock! Ships in 5–10 business days</span>
                                                    <span style={{ fontSize: '10px', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => removeProduct(item.id)}>remove</span>
                                                </div>
                                                <hr />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* third row */}
                            <div className="third-row m-2">
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Subtotal</span>
                                    <span>{totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Shipping</span>
                                    <span>Calculated at checkout</span>
                                </div>
                                <p>
                                    Apply promo code +
                                </p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h6>Total</h6>
                                    <h6>{totalPrice.toFixed(2)}</h6>
                                </div>
                                <button className="btn btn-warning">
                                    Secure Checkout
                                </button>
                            </div>
                        </>
                    )
                    }

                    {cartCount === 0 && (<p>Your Cart Is Empty</p>)}

                </aside >
            </div>
        </>
    );
};

export default Sidebar
