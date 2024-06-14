import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";


const Header = ({ className, openNav }) => {
    const links = ["products", "cart"];
    const { cartList } = useSelector(state => state.cart)
    const cartCount = cartList.map(prod => prod.count).reduce((prev, count) => prev + count, 0);



    return (
        <nav className={`${className} navbar navbar-expand-lg bg-body-tertiary sticky-top top-0`}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Momentum</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item d-flex justify-content-center align-items-center p-0" style={{ cursor: "pointer" }}>
                            <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} aria-current="page" to={`/products`}>Products</NavLink>
                        </li>
                        <li className="nav-item d-flex justify-content-center align-items-center p-0" onClick={openNav} style={{ cursor: "pointer" }}>
                            <span className="nav-link">Cart <FaShoppingCart /> {`(${cartCount})`}</span>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;