'use client'

import React from "react";
import { Product } from "../types/product";
import {useProducts} from "../hooks/useProducts";
import { ItemCard } from "../components/ItemCard";
import './page.css'

export default function Products() {
    const { data, isLoading, isSuccess } = useProducts();
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="">
        {isSuccess && data.map((product: Product) => {
            return (
                <div key={product.id + 'div'} className="card-wrapper">
                    <ItemCard key={product.id} product={product} />
                </div>
            )
        })}
        </div>
    );
}
