'use client'

import { useState } from "react";
import FileUploader from "../../components/FileUploader"
import { toast } from "react-toastify";
import { useQueryClient } from 'react-query';
import { createProduct } from "@/app/hooks/useProducts";

export default function Form() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');

    const queryClient = useQueryClient();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const product = {
                title,
                price: parseFloat(price),
                category,
                description,
                images: imageURL,
            };
            const response = await createProduct(product);
            toast('Product is created!');
            await queryClient.invalidateQueries('products');
            console.log(response);
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        } catch (error) {
            if (error instanceof Error) toast.error("Failed to add product: " + error.message);
        }
    };

    return (   
        <form className="max-w-md mx-auto my-10" onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
                <input 
                    type="text" 
                    name="floating_title" 
                    id="floating_title" 
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    placeholder=" "
                    onChange={(e) => setTitle(e.target.value)}
                    required 
                />
                <label 
                    htmlFor="floating_title" 
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Product Title
                </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input 
                    type="text" 
                    name="floating_price" 
                    id="floating_price" 
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    placeholder=" " 
                    onChange={(e) => setPrice(e.target.value)}
                    required 
                />
                <label 
                    htmlFor="floating_price" 
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Product price ($)
                </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input 
                    type="text" 
                    name="category" 
                    id="floating_category" 
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    placeholder=" " 
                    onChange={(e) => setCategory(e.target.value)}
                    required 
                />
                <label 
                    htmlFor="floating_category" 
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Product Category
                </label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                    <input 
                        type="text" 
                        name="floating_description" 
                        id="floating_description" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" " 
                        onChange={(e) => setDescription(e.target.value)}
                        required 
                    />
                    <label 
                        htmlFor="floating_description" 
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Description
                    </label>
                </div>
            </div>

            <FileUploader setImageURL={setImageURL} />

            <button 
                type="submit" 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Submit
            </button>
        </form>
    )
}