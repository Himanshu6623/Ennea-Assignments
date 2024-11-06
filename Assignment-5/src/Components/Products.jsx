
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Change,Reviews} from "../Redux/CounterSlice/Review";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
export default function Products() {
    const [prod, setProd] = useState([]);
    const dispatch=useDispatch()
    const [product,setProduct]=useState("")
    const [search,setsearch]=useState("")
    const Find_item=(event)=>{
      setProduct(event.target.value)
    }
    const handleSearch = (event) => {
      event.preventDefault(); 
      setsearch(product)
    };
    const { data, error, isLoading } = useQuery('fetchData', () =>
      axios.get('https://dummyjson.com/products').then(res => res.data.products)
    );
    React.useEffect(() => {
      if (data) {
        setProd(data);
      }
    }, [data]);
    
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>An error occurred</p>;

    const filteredProducts = prod.filter((prod) =>
        search=== "All products" || search === "" ? true : (prod.id === parseInt(search)|| (prod.category && prod.category.toLowerCase() === search.toLowerCase()) || (prod.brand && prod.brand.toLowerCase() === search.toLowerCase())
        ||(prod.title && prod.title.toLowerCase() === search.toLowerCase()))
    );
    const handleReviewClick = (productId,productReview) => {
        dispatch(Change(productId))
        dispatch(Reviews(productReview))
    };
    const card = filteredProducts.map((product) => (
        <div className="col-md-3" style={{ margin: "10px" }} key={product.id}>
            <div className="card h-60 w-60">
                <div className="text-center">
                    <img src={product.images[0]} style={{height:"200px",width:"200px"}} className="card-img-center" alt={product.title} />
                </div>
                <div className="card-body">
                    <h5 className="card-text">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <Link to='/Reviews'>
                        <button className="btn btn-success" onClick={() => handleReviewClick(product.id,product.reviews)} >
                            View Reviews 
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    ));

    return (
        <>
            <div className="container text-center" style={{ position: "relative", marginTop: "20px" }}>
                <h1>PRODUCTS CARDS</h1>
                <form  className="d-flex" role="search" onSubmit={handleSearch} style={{ position: "absolute", right: "0", top: "100%" }}>
                  <input className="form-control me-2" type="search" value={product} onChange={Find_item} placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-success" type="submit">Search</button>
                </form> 
            </div>
            <div className="container mt-5">
                <div className="row">
                    {card}
                </div>
            </div>
        </>
    );
}

