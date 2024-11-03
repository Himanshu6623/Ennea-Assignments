import React, { useState } from "react";
import { Form, Button, Input, notification , DatePicker, Space, Typography } from 'antd';
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import moment from 'moment'
import { NewTitle, NewDescription, NewCategory, NewPrice, 
    NewDiscountPercentage, NewRating, NewStock, 
    NewWarrantyInformation, NewShippingInformation, 
    NewAvailabilityStatus, NewImages ,NewUserId} from "../Redux/CounterSlice/Newproduct";

export default function AddProduct() {
    const dispatch = useDispatch();
    const Navigate=useNavigate()
    const [start,setstart]=useState(moment().subtract(7,'days'))
    const [end,setend]=useState(moment())

    const changestartdate=(date)=>{
        setstart(date)
        if(date.isAfter(end))
        {
            setend(date)
        }
    }
    const changeenddate=(date)=>{
        setend(date)
    }
    const disabledDate = (current) => {
        return current && current < start.startOf('day');
    };
    
    const handleSearch = (values) => {
        dispatch(NewTitle(values.title));
        dispatch(NewUserId(values.UserId));  
        dispatch(NewCategory(values.category)); 
        dispatch(NewPrice(values.price)); 
        dispatch(NewDescription(values.description)); 
        dispatch(NewDiscountPercentage(values.discountPercentage)); 
        dispatch(NewRating(values.rating)); 
        dispatch(NewStock(values.stock)); 
        dispatch(NewWarrantyInformation(values.warrantyInformation)); 
        dispatch(NewShippingInformation(values.shippingInformation)); 
        dispatch(NewAvailabilityStatus(values.availabilityStatus)); 
        dispatch(NewImages(values.image));
        setTimeout(() => {
            form.resetFields();
        }, 1000);
        Navigate('/post')
    };

    const [form] = Form.useForm();

    return (
        <>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '130vh', 
                backgroundColor: '#f5f5f5'
            }}>
                <Form 
                    form={form}
                    onFinish={handleSearch} 
                    style={{ width: '400px', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                >
                    <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the product title' }]}>
                        <Input placeholder="Enter the product title" />
                    </Form.Item>
                    <Form.Item name="UserId" label="User ID" rules={[{ required: true, message: 'Please enter the product title' }]}>
                        <Input placeholder="Enter the UserID" type="number"/>
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter the product description' }]}>
                        <Input placeholder="Enter product description" />
                    </Form.Item>
                    <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please enter the product category' }]}>
                        <Input placeholder="Enter product category" />
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the product price' }]}>
                        <Input placeholder="Enter product price" />
                    </Form.Item>
                    <Form.Item name="discountPercentage" label="Discount Percentage" rules={[{ required: true, message: 'Please enter the discount percentage' }]}>
                        <Input placeholder="Enter product discount percentage"  />
                    </Form.Item>
                    <Form.Item name="discountTimeLimit" label="Discount Time">
                        <Space direction="horizontal">
                            <DatePicker
                                value={start}
                                onChange={changestartdate}
                                format="YYYY-MM-DD"
                                placeholder="Select Start Date"
                            />
                            <DatePicker
                                value={end}
                                onChange={changeenddate}
                                format="YYYY-MM-DD"
                                disabledDate={disabledDate}
                                placeholder="Select End Date"
                            />
                        </Space>
                    </Form.Item>
                    <Form.Item name="rating" label="Rating" rules={[{ required: true, message: 'Please enter the product rating' }]}>
                        <Input placeholder="Enter product rating" />
                    </Form.Item>
                    <Form.Item name="stock" label="Stock" rules={[{ required: true, message: 'Please enter the product stock' }]}>
                        <Input placeholder="Enter product stock"  />
                    </Form.Item>
                    <Form.Item name="warrantyInformation" label="Warranty Information" rules={[{ required: true, message: 'Please enter the product warranty information' }]}>
                        <Input placeholder="Enter product warranty information" />
                    </Form.Item>
                    <Form.Item name="shippingInformation" label="Shipping Information" rules={[{ required: true, message: 'Please enter the product shipping information' }]}>
                        <Input placeholder="Enter product shipping information" />
                    </Form.Item>
                    <Form.Item name="availabilityStatus" label="Availability Status" rules={[{ required: true, message: 'Please enter the product availability status' }]}>
                        <Input placeholder="Enter product availability status" />
                    </Form.Item>
                    <Form.Item name="image" label="Images Link" rules={[{ required: true, message: 'Please enter the image link' }]}>
                        <Input placeholder="Enter Images Link" />
                    </Form.Item>
                    <Form.Item>
                        <Button className="btn btn-success" type="primary" htmlType="submit">
                            Add Product
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}
