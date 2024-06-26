import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductList from "./pages/productList/ProductList";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Sidebar from "./components/sidebar/Sidebar";
import { useState } from "react";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const openNav = () => {
    setIsSidebarOpen(true);
  };

  const closeNav = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={`app ${isSidebarOpen ? 'overflow-hidden' : ''}`}>
      {isSidebarOpen && <Sidebar isSidebarOpen={isSidebarOpen} closeNav={closeNav} />}
      <Header className='header' openNav={openNav} />
      <div className="changable-content">
        <Routes>
          <Route path="/" element={<Navigate to="products" replace />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/:id" element={<ProductDetails />} />
        </Routes>
      </div>
      <Footer className='footer' />
    </div>
  );
}

export default App;