
import React, { useState, useEffect, ChangeEvent } from "react";
import { IoClose } from "react-icons/io5";
import { DataProps } from "./ProductsFeatures";
import axios from 'axios';

interface AddProductsProps {
    id: 0,
    profilePicture: File | null| string,
    productName: '',
    description: '',
    price: 0,
    quantity: 0
}

interface ModalProps {
    modalActive: boolean;
    onChange: () => void;
    product: DataProps;
    onEdit: (data: DataProps) => void;
}

export default function EditProductModal({ modalActive, onChange,product,onEdit }: ModalProps) {
 const [imagePreview, setImagePreview] = useState('')

    const [formData, setFormData] = useState<DataProps>({
        ...product
    })
   

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setFormData(PrefData => ({ ...PrefData, profilePicture: file }))
            const imageUrl = window.URL.createObjectURL(file)

            setImagePreview(imageUrl)
        }
    }


    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        onEdit(formData)
    }
    useEffect(() => {
        return () => {
            if (imagePreview) {
                window.URL.revokeObjectURL(imagePreview)
            }
        }
    }, [imagePreview])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    }
    return (
        <>
            <div className="flex  rounded-2xl items-center bg-white text-textColor pt-5 pb-10 w-full h-full flex-col ">
                <div className=" pr-5 flex justify-end w-full pb-10 pl-5">
                 
                    <IoClose className="text-4xl cursor-pointer" onClick={onChange} />
                </div>
                <div className="h-full w-full" >
                    <form className="flex flex-col pl-10 pr-10"  onSubmit={handleSubmit} encType="multipart/form-data">

                        <div className="flex justify-between items-center flex-col">

                            <label className="flex flex-col gap-2 pr-5">
                                
                                <div className="relative h-48 ">
                                    
                                    {imagePreview ? (
                                        <div className="relative w-52 h-48 group">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                                <span className="text-white text-sm">Click to change</span>
                                            </div>
                                            <input
                                                type="file"
                                                onChange={handleImageChange}
                                                accept="image/*"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                name="profilePicture"
                                            />
                                        </div>
                                    ) : (
                                        <div className="border-2 border-l-inherit border-gray-300 rounded-lg p-4 text-center w-48">
                                            <input
                                                type="file"
                                                onChange={handleImageChange}
                                                accept="image/*"
                                                className="hidden"
                                                
                                                id="image-upload"
                                                name="profilePicture"
                                            />
                                            <label
                                                htmlFor="image-upload"
                                                className="cursor-pointer text-gray-500 hover:text-header"
                                            >
                                                <div className="flex flex-col items-center gap-2">
                                                    <span className="text-3xl">+</span>
                                                    <span>Butang Image</span>
                                                </div>
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </label>



                        </div>
                       <div className="flex  justify-evenly  pt-5 pb-5">
                         <label className="flex flex-col">
                            Product Name
                            <input type="text" placeholder="Enter Product Name" className="p-3 border-BoldColor border rounded-lg focus-within:outline-2 focus-within:outline-header " name="productName" onChange={handleChange} value={formData.productName}></input>
                        </label>
                        <label className="flex flex-col">
                            Price
                            <input type="number" placeholder="Enter Price" className="p-3 border border-BoldColor rounded-lg focus-within:outline-2 focus-within:outline-header" name="price" onChange={handleChange} value={formData.price}></input>
                        </label>
                       </div>
<div className="flex  justify-evenly  pt-5 pb-5 items-center">
    
                        <label className="flex flex-col w-64">
                            Description:
                            <textarea placeholder="Enter Description" className=" p-3 pt-10 pb-10 border border-BoldColor rounded-lg focus-within:outline-2 focus-within:outline-header" name="description" onChange={handleChange} value={formData.description}></textarea>
                        </label>

                        <label className="flex flex-col pb-10 ">
                            Quantity:
                            <input type="number" placeholder="Enter Quantity" className="p-3 border border-BoldColor rounded-lg focus-within:outline-2 focus-within:outline-header " name="quantity" onChange={handleChange} value={formData.quantity}></input>
                        </label>
</div>

                      <div className="flex justify-center">
                          <button type="submit" className="text-white h-14 font-bold w-50 flex justify-center items-center" >Edit Product</button>
                      </div>
                    </form>
                </div>
            </div>
        </>
    )
}