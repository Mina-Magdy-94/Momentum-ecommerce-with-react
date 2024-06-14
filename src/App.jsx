import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductList from "./pages/productList/ProductList";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Sidebar from "./components/sidebar/Sidebar";
import { useState } from "react";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  const openNav = () => {
    console.log('openNav')
    setIsSidebarOpen(true);
  };

  const closeNav = () => {
    console.log("closeNav")
    setIsSidebarOpen(false);
  };

  // useEffect(() => {
  //   console.log({ isSidebarOpen })
  // }, [isSidebarOpen])

  return (
    // ${isSidebarOpen ? 'overflow-hidden' : ''}
    <div className={`app ${isSidebarOpen ? 'overflow-hidden' : ''}`}>
      {/* isSidebarOpen={isSidebarOpen} closeNav={closeNav} */}
      {isSidebarOpen && <Sidebar isSidebarOpen={isSidebarOpen} closeNav={closeNav} />}
      {/* openNav={openNav} */}
      <Header className='header' openNav={openNav} />
      <Routes>
        <Route path="/" element={<Navigate to="products" replace />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/:id" element={<ProductDetails />} />
      </Routes>
      <Footer className='footer' />
    </div>
  );
}

export default App;
