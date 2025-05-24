import { useCallback, useState, useEffect } from "react"
import { DataProps } from "../../components/sellerComponent/ProductsFeatures"

import axios from 'axios';
export default function ShopPage(){


const [products,setProducts]=useState<DataProps[]>([])


const fetchData=useCallback(async ()=>{

    const token=localStorage.getItem('token');

    try{
        const response=await axios.get<DataProps[]>('http://127.0.0.1:8000/kupal/products/',
            {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        setProducts(response.data)
    }catch(e){
        console.log('====================================');
        console.log('Errrrr',e);
        console.log('====================================');
    }

    

},[])


 useEffect(() => {
        fetchData()
    }, [fetchData])

    return(
        <>
        <div>
        {products.map(product=>{
            return (
                <>
                <div key={product.id}>
                 <div>
                    <img src={`http://127.0.0.1:8000${product.profilePicture}`} alt="" />
                 </div>

                 <div>
                     <p>
                        {product.productName}
                     </p>
                     <p>{product.description}</p>
                     <p>{product.price}</p>
                     <p>{product.quantity}</p>
                 </div>
                </div>
                </>
            )
        })}
        </div>
        </>
    )
}