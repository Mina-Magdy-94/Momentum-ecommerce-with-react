import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductList from "./pages/productList/ProductList";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";

function App() {
  return (
    <div className="app">
      <Header className='header' />
      <Routes>
        <Route path="/" element={<Navigate to="products" replace />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
      <Footer className='footer' />
    </div>
  );
}

export default App;
