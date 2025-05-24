
import { useEffect, useState, useCallback } from "react"
import axios from 'axios';
import AddProductModal from "./AddProductModal";
import { MdEdit, MdDelete } from "react-icons/md";

import { HiDotsVertical } from "react-icons/hi";
import EditProductModal from "./EditProduct";


export interface DataProps {
    id: number
    profilePicture: string | null | File
    productName: string;
    description: string;
    price: number;
    quantity: number;
}

export default function ProductsFeatures() {
    const [products, setProducts] = useState<DataProps[]>([])
    const [modal, setModal] = useState<boolean>(false);
    const [addProductModal, setAddProductModal] = useState<boolean>(false);
    const [editProduct, setEditProduct] = useState(false);
    const [activeProductId, setActiveProductId] = useState<number | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<DataProps | null>(null)
    const fetchData = useCallback(async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.get<DataProps[]>(`http://127.0.0.1:8000/kupal/products/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setProducts(response.data)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }, [])
    const handleEdit = async (productId: number, updatedData: Partial<DataProps>) => {

        const response = await axios.put<DataProps[]>(`http://127.0.0.1:8000/kupal/products/${productId}/`,
            updatedData
            , {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        if (response.status === 201 || response.status === 200) {
            await fetchData()
            setModal(false)
            setActiveProductId(null)
        }
    }


    const handleDelete = async (productId: number) => {

        const response = await axios.delete(`http://127.0.0.1:8000/kupal/products/${productId}/`,
           
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        if (response.status === 204 || response.status === 200) {
           await fetchData()
           setActiveProductId(null)
        window.location.reload();
        }
    }
    useEffect(() => {
        fetchData()
    }, [fetchData])


    return (
        <>

            <div className=" h-full w-full">
                <div className=" pb-20 flex items-center justify-between">
                    <h2 className='text-4xl font-medium text-BgColor1'>Dashboard</h2>
                    <h2>  <h1 className='font-bold text-BgColor1'>Thrift Shop</h1></h2>
                    <div>
                        <button className="text-white" type="submit" onClick={() => setAddProductModal(true)}>Add Product</button>
                    </div>
                </div>
                <div className="overflow-x-auto rounded-lg shadow text-white w-full">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Image</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Product Name</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Description</th>
                                <th className="px-10 py-4 text-left text-sm font-medium text-gray-500">Price</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Quantity</th>

                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 ">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <img
                                            className="w-20 h-20 object-cover rounded-lg"
                                            src={`http://127.0.0.1:8000${product.profilePicture}`}
                                            alt={product.productName}
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 text-white font-medium">{product.productName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 text-white font-medium">{product.description}</td>
                                    <td className="px-10 py-4 text-sm text-gray-900 text-white font-medium">₱{product.price}</td>
                                    <td className="px-7 py-4 text-sm text-gray-900 text-white font-medium">{product.quantity}</td>
                                    <div className="relative pt-10 " >
                                        <td className="pl-10">
                                           <div className="absolute flex flex-col top-2 -left-6 h-24 w-24 justify-evenly items-center rounded-xl">
                                                    <MdEdit
                                                        className="text-BlueColor text-3xl cursor-pointer"
                                                        onClick={() => {
                                                            setSelectedProduct(product);
                                                            setModal(true);
                                                        }}
                                                    />
                                                    <MdDelete className="text-RedColor text-3xl cursor-pointer" onClick={()=> handleDelete(product.id)} />
                                                </div>
                                        </td>
                                     
                                    </div>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {
                    addProductModal && <div className="absolute bottom-0 top-0 border-0 left-0 right-0 h-full w-full  bg-ModalColor z-10 transition-opacity duration-300 ease-in-out">
                        <div className=" h-full w-full flex justify-center items-center">
                            <AddProductModal modalActive={modal} onChange={() => setAddProductModal(false)}></AddProductModal>
                        </div>
                    </div>
                }
                {
                    modal && <div className="absolute bottom-0 top-0 border-0 left-0 right-0 h-full w-full  bg-ModalColor z-10 transition-opacity duration-300 ease-in-out">
                        <div className=" h-full w-full flex justify-center items-center">
                            <EditProductModal
                                modalActive={modal}
                                onChange={() => {
                                    setModal(false)
                                    setActiveProductId(null)

                                }}
                                product={selectedProduct}
                                onEdit={(data) => handleEdit(selectedProduct?.id, data)}

                            >

                            </EditProductModal>
                        </div>
                    </div>
                }

            </div>
        </>
    )
}