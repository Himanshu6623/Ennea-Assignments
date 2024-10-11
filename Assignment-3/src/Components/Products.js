import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { Add } from '../Redux/CounterSlice/CartSlice';
export default function Products() {
  const count = useSelector((state) => state.search.value); // 'count' is the search input
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [details, setDetails] = useState([]); // Tracks expanded products
  const mode=useSelector(state=>state.color.mode)
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((data) => data.json())
      .then((result) => setProducts(result));
  }, []);

  const filteredProducts = products.filter((product) =>
    count === "All products" || count === "" ? true : product.category === count
  );

  const toggleDetails = (productId) => {
    if (details.includes(productId)) {
      setDetails(details.filter((id) => id !== productId));
    } else {
      setDetails([...details, productId]);
    }
  };

  const card = filteredProducts.map((product) => (
    <div className="col-md-3" style={{ marginBottom: '10px' }} key={product.id}>
      <Card className="h-100" style={{color : mode==='light'?'black' : 'white' ,backgroundColor : mode==='light'?'white' : 'black'}}>
        <div className="text-center">
          <Card.Img
            variant="top"
            style={{ height: '130px', width: '100px' }}
            src={product.image}
          />
        </div>
        <Card.Body>
          <Card.Title className="text-center">{product.title}</Card.Title>
          <Card.Text className="text-center">MRP - ${product.price}</Card.Text>
          <Card.Text className="text-center" >
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => toggleDetails(product.id)}
            >
              {details.includes(product.id) ? "Hide details" : "View details"}
            </button>
            {details.includes(product.id) && ( 
              <div className="card card-body mt-2" style={{color : mode==='light'?'black' : 'white' ,backgroundColor : mode==='light'?'white' : 'black'}}>
                {product.description}
              </div>
            )}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-center" >
          <Button variant="primary" onClick={() => dispatch(Add(product))}>
            Add to Cart
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ));

  return (
    <>
      <h1 className="text-center" style={{color : mode==='light'?'black' : 'white' }}>Products</h1>
      <div className="row">
        {card.length > 0 ? card : <p className="text-center">No products found.</p>}
      </div>
    </>
  );
}
