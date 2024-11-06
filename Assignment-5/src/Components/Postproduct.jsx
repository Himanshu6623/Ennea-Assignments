import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { useMutation } from 'react-query';  // Correct import for useMutation
import { Add } from '../Redux/CounterSlice/Updatedvalue';

export default function Postproduct() {
  const postProduct = async (product) => {
      const response = await fetch('https://dummyjson.com/posts/add', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(product),
      });
  
      return response.json();
  };
  const value = useSelector((state) => state.new);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate, isLoading, isError, error } = useMutation(postProduct, {
    onSuccess: (data) => {
      dispatch(Add(value)); 
      notification.success({
        message: 'Product Added Successfully!',
        description: `The product "${value.title}" has been added to the inventory.`,
        placement: 'topRight',
        duration: 3,
      });
      navigate('/');
    },
    onError: (error) => {
      notification.error({
        message: 'Error Adding Product',
        description: error.message,
        placement: 'topRight',
        duration: 3,
      });
    },
  });

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
      
      <button
        className="btn btn-primary"
        onClick={() => mutate(value)} 
        disabled={isLoading} 
      >
        {isLoading ? 'Posting...' : 'Post Product'}
      </button>

      {isError && (
        <div className="error-message">
          <p>Error: {error.message}</p>
        </div>
      )}
    </div>
  );
}
