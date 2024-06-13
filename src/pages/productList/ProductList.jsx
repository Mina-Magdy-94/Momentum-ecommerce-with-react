import { useEffect, useRef, useState } from 'react'
import './ProductList.css'
import ProductCard from '../../components/ProductCard/ProductCard'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { getAllProducts } from '../../API/productsApi'


const ProductList = () => {
  // const [activeCategory, setActiveCategory] = useState(null)
  // let { productsList } = useSelector(state => state.products)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [categorizedProducts, setCategorizedProducts] = useState([])
  let baseURL = "https://fakestoreapi.com/products"
  // const categoryToHtmlElRef = useRef({});
  const [activeCategory, setActiveCategory] = useState('');


  const groupByCategory = (products) => {
    return products.reduce((acc, product) => {
      const { category } = product;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});
  };

  // let dispatch = useDispatch()

  let getAllProducts = async () => {
    let response = await axios.get(baseURL)
    let prods = response.data
    let categoriesOfAllProducts = prods.map(p => p.category)
    setCategories([...new Set(categoriesOfAllProducts)])
    setProducts(prods)
    let catProducts = groupByCategory(prods)
    setCategorizedProducts(catProducts)
  }

  useEffect(() => {
    getAllProducts()
    // dispatch(getAllProducts())
  }, [])


  return (
    <div className='container-fluid d-flex flex-column row-gap-4'>
      <main className="row">
        <div className='hero-image col-12 d-flex flex-column justify-content-center align-items-start p-3 text-light'>
          <h3>Our Products</h3>
          <p className='fw-semibold'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio eius cupiditate maiores cumque in earum aperiam ducimus culpa accusantium tempora.</p>
        </div>
      </main>

      <section className="row px-2 px-md-5">
        <div className='categories col-12 d-flex justify-content-start align-items-center flex-wrap gap-3 w-100'>
          {categories.map((category) => {
            return (
              <a href={`#${category}`} key={category} className={`category-filter  ${activeCategory === category ? 'active-category-filter' : 'inactive-category-filter'}`}
                onClick={() => setActiveCategory(category)}
              >
                {category.toUpperCase()}</a>
            )
          })}
        </div>

      </section>

      <section >
        {Object.keys(categorizedProducts).map((category) => {
          return (
            <section key={category} id={`${category}`} className='row px-2 px-md-5 justify-content-start align-items-center'>
              <h3 className='products-category-title'>{category.toUpperCase()}</h3>
              {categorizedProducts[category].map((product) => {
                return (
                  < ProductCard key={product.id} product={product} />
                )
              })}
            </section>
          )
        })}
      </section>

      <div>

      </div>

    </div>
  )
}

export default ProductList
