import React, { useState, useEffect, useMemo } from "react";
import { Table } from "antd";
import { useDispatch,useSelector} from "react-redux";
import { New,Add } from "../Redux/CounterSlice/Updatedvalue";
import { Change,Reviews} from "../Redux/CounterSlice/Review";
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
export default function Testing() {

    const [product,setProduct]=useState("")
    const [search,setSearch]=useState("")
    const dispatch=useDispatch()
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

  const columns = productsList.length > 0
    ? Object.keys(productsList[0])
        .filter((key) => typeof productsList[0][key] !== 'object')
        .filter((key)=>key!=="thumbnail" && key!=="sku" && key!=="weight" && key!=="returnPolicy" && key!=="minimumOrderQuantity")
        .map((key) => ({
          title: key.charAt(0).toUpperCase() + key.slice(1),
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
            </form> 
        </div>
        <div className="container m-5">
            <Table dataSource={filteredProducts} columns={columns} rowKey="id" />
        </div>
    </>
  );
}