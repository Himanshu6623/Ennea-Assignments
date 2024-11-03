import React from "react";
import { useSelector } from "react-redux";
import { Table } from "antd";
export default function Productreview()
{
    const productReview=useSelector((state)=>state.review.reviews)
    const columns =productReview.length > 0
        ? Object.keys(productReview[0][0]).map((key) => ({
            title: key.charAt(0).toUpperCase() + key.slice(1),
            dataIndex: key,
            key: key,
        }))
        : [];

    return(
        <>
            <Table dataSource={productReview[0] || []} columns={columns} rowKey="id" />
        </>
    );
}