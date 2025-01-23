import { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineStarRate } from "react-icons/md";
import Button from 'react-bootstrap/Button';
const Api = () => {
  let [categories, setCategories] = useState([]);
  let [products, setProducts] = useState([]);
  useEffect(() => {
    storeApi();
  }, []);

  const storeApi = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://fakestoreapi.com/products/categories`,
      headers: {}
    };
    axios.request(config)
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
        getApiProduct(response.data[0]);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };

  const getApiProduct = (name) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://fakestoreapi.com/products/category/${name}`,
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log("Error fetching products:", error);
      });
  };

  return (
    <>
      <h1>Store Api</h1>
      <div className="button-container">
        {categories.map((category, index) => (
          <Button variant="danger" className="Button" key={index} onClick={() => getApiProduct(category)} >{category}</Button>
        ))}
      </div>
      <div>
        {products.map((product, index) => {
          const { rate, count } = product.rating || {};
          return (
            <div className="FetchApi" key={index}>
              <img src={product.image} className="ApiImages" alt={product.title} />
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <div className="Rateprice">
                  <h3 className="Rate"><MdOutlineStarRate className="font" />Rate: {rate}</h3>
                  <h4>price :${product.price}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Api;
