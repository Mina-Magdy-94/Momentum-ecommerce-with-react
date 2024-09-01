import { useEffect, useState } from 'react'
import './ProductList.css'
import ProductCard from '../../components/ProductCard/ProductCard'
import axios from 'axios'
import Spinner from '../../components/spinner/Spinner'



const ProductList = () => {
  const baseURL = import.meta.env.VITE_ALL_PRODUCTS_API

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [categorizedProducts, setCategorizedProducts] = useState([])
  const [activeCategory, setActiveCategory] = useState('');
  const [selectedSortBy, setSelectedSortBy] = useState('');
  const getSortedProducts = (categorizedProducts) => selectedSortBy === '' ?
    categorizedProducts :
    ([...categorizedProducts].sort((a, b) => {
      if (selectedSortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (selectedSortBy === 'price') {
        return a.price - b.price;
      } else {
        throw new Error("Illegal state");
      }
    }));

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


  let getAllProducts = async () => {
    setIsLoading(true)
    try {
      let response = await axios.get(baseURL)
      let prods = response.data
      let categoriesOfAllProducts = prods.map(p => p.category)
      setCategories([...new Set(categoriesOfAllProducts)])
      setProducts(prods)
      let catProducts = groupByCategory(prods)
      setCategorizedProducts(catProducts)
      setIsLoading(false)
      setError(null)
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <div className='container-fluid d-flex flex-column row-gap-4'>
      <main className="row">
        <div className='hero-image col-12 d-flex flex-column justify-content-center align-items-start p-3 text-light'>
          <h3>Our Products</h3>
          <p className='fw-semibold'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio eius cupiditate maiores cumque in earum aperiam ducimus culpa accusantium tempora.</p>
        </div>
      </main>


      {products.length && (
        <>
          <section className="row px-2 px-md-5">
            <div className='categories col-12 d-flex justify-content-start align-items-center flex-wrap gap-3 w-100'>
              <>
                {categories.map((category) => {
                  return (
                    <a href={`#${category}`} key={category} className={`category-filter  ${activeCategory === category ? 'active-category-filter' : 'inactive-category-filter'}`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category.toUpperCase()}
                    </a>
                  )
                })}
                <span>Sort by: </span>
                <select className="sort-by-select-input" aria-label="Large select example" value={selectedSortBy} onChange={(e) => setSelectedSortBy(e.target.value)}>
                  <option value=''></option>
                  <option value='title'>Title</option>
                  <option value='price'>Price</option>
                </select>
              </>
            </div>

          </section>

          <section >
            {Object.keys(categorizedProducts).map((category) => {
              return (
                <section key={category} id={`${category}`} className='row px-2 px-md-5 justify-content-start align-items-center'>
                  <h3 className='products-category-title'>{category.toUpperCase()}</h3>
                  {getSortedProducts(categorizedProducts[category]).map((product) => {
                    return (
                      < ProductCard key={product.id} product={product} />
                    )
                  })}
                </section>
              )
            })}
          </section>
        </>
      )}

      {isLoading && (
        <div className='d-flex justify-content-center align-items-center'>
          <Spinner />
        </div>
      )}

      {error && (<p className='alert alert-danger'>Error Please try Again</p>)}

    </div>
  )
}

export default ProductList
