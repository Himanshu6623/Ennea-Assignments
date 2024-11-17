import React, { useState, useEffect ,useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Change,Reviews} from "../Redux/CounterSlice/Review";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { New } from "../Redux/CounterSlice/Updatedvalue";
import styled from "styled-components";
export default function Products() {
    const [prod, setProd] = useState([]);
    const dispatch=useDispatch()
    const [product,setProduct]=useState("")
    const [search,setSearch]=useState("")
    const Find_item=(event)=>{
      setProduct(event.target.value)
    }
    const productsList=useSelector((state)=>state.update.products)
    const handleSearch = (event) => {
      event.preventDefault(); 
      setSearch(product)
    };
    const { data, error, isLoading } = useQuery('fetchData', () =>
        axios.get('https://dummyjson.com/products').then(res => res.data.products),{onSuccess:(data)=>{
          if (data && productsList.length===0) {
            dispatch(New(data))
          }
        }}
      );
      
    const filteredProducts = useMemo(()=>{
      if (productsList.length === 0) {
        return [];
    }
      return productsList.filter((prod) =>
        search=== "All products" || search === "" ? true : (prod.id === parseInt(search)|| (prod.category && prod.category.toLowerCase() === search.toLowerCase()) || (prod.brand && prod.brand.toLowerCase() === search.toLowerCase())
      ||(prod.title && prod.title.toLowerCase() === search.toLowerCase()))
    )},[productsList,search]);
    
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setSearch(product);
        }, 300);
  
        return () => clearTimeout(timeoutId);
      }, [product]);
    
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>An error occurred</p>;

    const handleReviewClick = (productId,productReview) => {
        dispatch(Change(productId))
        dispatch(Reviews(productReview))
    };

    const DIV1=styled.div({
        margin: "10px" 
    })
    const IMG=styled.img({
        height:"200px",
        width:"200px"
    })
    const DIV2=styled.div({
      position: "relative",
      marginTop: "20px"
    })
    const FORM1=styled.form({
      position: "absolute",
      right: "0",
      top: "100%"
    })
    const card = filteredProducts.map((product) => (
        <DIV1 className="col-md-3" key={product.id}>
            <div className="card h-60 w-60">
                <div className="text-center">
                    <IMG src={product.images[0]}  className="card-img-center" alt={product.title} />
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
        </DIV1>
    ));

    return (
        <>
            <DIV2 className="container text-center" >
                <h1>PRODUCTS CARDS</h1>
                <FORM1  className="d-flex" role="search" onSubmit={handleSearch} >
                  <input className="form-control me-2" type="search" value={product} onChange={Find_item} placeholder="Search" aria-label="Search" />
                </FORM1> 
            </DIV2>
            <div className="container mt-5">
                <div className="row">
                    {card}
                </div>
            </div>
        </>
    );
}
