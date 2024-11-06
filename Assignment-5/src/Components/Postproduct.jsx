import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { New,Add } from '../Redux/CounterSlice/Updatedvalue';
export default function Postproduct() {
    const value = useSelector((state) => state.new);
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(value),
    };

    async function Post() {
        try {
            const response = await fetch('https://dummyjson.com/posts/add', options);
            const result = await response.json();
            dispatch(Add(value))
            notification.success({
                message: 'Product Added Successfully!',
                description: `The product "${value.title}" has been added to the inventory.`,
                placement: 'topRight',
                duration: 3,
            });
            navigate('/')
        } catch (error) {
            console.error('Error:', error);
        }
        
    }
    return (
        <div className="container text-center">
            <div className="product-details m-4">
                <h2>Product Details</h2>
                <p><strong>Title:</strong> {value.title}</p>
                <p><strong>Description:</strong> {value.description}</p>
                <p><strong>Category:</strong> {value.category}</p>
                <p><strong>Price:</strong> ${value.price}</p>
                <p><strong>Discount Percentage:</strong> {value.discountPercentage}%</p>
                <p><strong>Rating:</strong> {value.rating}</p>
                <p><strong>Stock:</strong> {value.stock}</p>
                <p><strong>Warranty:</strong> {value.warrantyInformation}</p>
                <p><strong>Shipping Info:</strong> {value.shippingInformation}</p>
                <p><strong>Availability Status:</strong> {value.availabilityStatus}</p>
                <p><strong>Image:</strong> <img src={value.image} alt="Product" style={{ width: '200px' }} /></p>
            </div>
            <button className="btn btn-primary" onClick={Post}>
                Post Product
            </button>
        </div>
    );
}
