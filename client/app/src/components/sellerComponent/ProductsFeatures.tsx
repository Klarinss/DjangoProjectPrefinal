
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

            <div className=" h-full w-full flex relative">
                 <div className='absolute top-0 bottom-0 left-0 right-0  -z-50'>
            <img className='w-full h-full object-cover' src="../../public/bg/outdoor-hiking-equipment.jpg" alt="" />
           </div>
                <div className="bg-white w-56 mr-10">
                   <div className=" p-5 flex flex-col items-center">
                    <h2 className=" text-2xl font-bold text-BoldColor">Hello Store</h2>
                   </div>
                   <div className="flex items-center flex-col cursor-pointer">
                     <h2 className=" text-xl font-bold" onClick={()=> setAddProductModal(true)}>Add product</h2>
                   </div>
                </div>
               <div>
                 <div className=" pb-20 flex items-center justify-between">
                   
                    
                    
                </div>
                <div className=" rounded-lg shadow text-white w-full">
                   <div className="flex h-auto">
                    {products.map(product=>
                         <>

                      <div className="mr-5 h-auto">
                          <div className="w-48 h-48 bg-white rounded p-5">
                            <div className="relative w-full h-full">
                                 <img className="w-full object-cover h-full rounded" src={`http://127.0.0.1:8000${product.profilePicture}`} alt="" />
                            </div>
                           
                        </div>
                         <p className="pb-3">{product.productName}</p>
                        <div className="flex">
                             <p className="pr-5">{product.description}</p>
                             <b className="bg-BoldColor p-1 rounded">₱ {product.price}</b>
                        </div>
                        <div className="pt-5 flex justify-between">
                            <MdEdit className="text-BlueColor  text-3xl cursor-pointer" onClick={() => {
                                setSelectedProduct(product);
                                setModal(true);
                            }}></MdEdit>
                            <MdDelete className=" text-3xl cursor-pointer" onClick={()=> handleDelete(product.id)}></MdDelete>
                        </div>
                      </div>
                         </>
                        
                        
                    )}
                   </div>
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

            </div>
        </>
    )
}