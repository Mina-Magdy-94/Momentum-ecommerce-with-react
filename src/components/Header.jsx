import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = ({ className }) => {
    const links = ["products", "cart"];
    const { cartList } = useSelector(state => state.cart)
    const cartCount = cartList.map(prod => prod.count).reduce((prev, count) => prev + count, 0);


    // let {className}=props
    return (
        <nav className={`${className} navbar navbar-expand-lg bg-body-tertiary sticky-top top-0`}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Momentum</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {links.map((link) => {
                            return (
                                <li className="nav-item" key={link}>
                                    <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} aria-current="page" to={`/${link}`}>{link.toUpperCase()}{link === 'cart' ? `(${cartCount})` : ''}</NavLink>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
