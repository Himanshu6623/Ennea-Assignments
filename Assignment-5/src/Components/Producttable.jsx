import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { useDispatch} from "react-redux";
import { Change,Reviews} from "../Redux/CounterSlice/Review";
import { Link } from 'react-router-dom';
export default function Testing() {
    const [prod, setProd] = useState([]);
    const [product,setProduct]=useState("")
    const [search,setsearch]=useState("")
    const dispatch=useDispatch()
    const Find_item=(event)=>{
      setProduct(event.target.value)
    }
    const handleSearch = (event) => {
      event.preventDefault(); 
      setsearch(product)
    };
    useEffect(()=>{
        async function API(){
            const data=await fetch('https://dummyjson.com/products')
            const json=await data.json()
            setProd(json.products)
        }
        API()
    },[])

    const filteredProducts = prod.filter((prod) =>
        search=== "All products" || search === "" ? true : (prod.id === parseInt(search)|| (prod.category && prod.category.toLowerCase() === search.toLowerCase()) || (prod.brand && prod.brand.toLowerCase() === search.toLowerCase()))
    );


  const columns = prod.length > 0
    ? Object.keys(prod[0])
        .filter((key) => typeof prod[0][key] !== 'object')
        .filter((key)=>key!=="thumbnail" && key!=="sku" && key!=="weight")
        .map((key) => ({
          title: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize column titles
          dataIndex: key,
          key: key,
        }))
    : [];
  columns.push({
    title: 'Image',
    dataIndex: 'images',
    key: 'image',
    render: (images) => <img src={images[0]} alt="Product" style={{ height :100 ,width: 200 }} />,
  });
  const handleReviewClick = (productId,productReview) => {
    dispatch(Change(productId))
    dispatch(Reviews(productReview))
  };

  columns.push({
    title: 'Reviews',
    dataIndex: 'Reviews',
    key: 'Reviews',
    render: (_, record) => (
      <Link to='/Reviews'>
        <button className="btn btn-success" onClick={() => handleReviewClick(record.id,record.reviews)} >
         View Reviews 
        </button>
      </Link>
    ),
  });

  return (
    <>
        <div className="container text-center" style={{ position: "relative", marginTop: "20px" }}>
            <h1>PRODUCTS TABLE</h1>
            <form  className="d-flex" role="search" onSubmit={handleSearch} style={{ position: "absolute", right: "0", top: "100%" }}>
              <input className="form-control me-2" type="search" value={product} onChange={Find_item} placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form> 
        </div>
        <div className="container m-5">
            <Table dataSource={filteredProducts} columns={columns} rowKey="id" />
        </div>
    </>
  );
}
