
import bg from '../../assets/images/bg/bg2.webp'
import logo from '../../assets/images/logo/bini-logo-allwhite.png'
import AddProductModal from '../../components/sellerComponent/AddProductModal'
import ProductsFeatures from '../../components/sellerComponent/ProductsFeatures'

export default function SellerDashboard() {

    const list = [
        'Dashboard',
        'Products'
    ]

    
    return (
        <>
            <div className="relative  w-screen h-screen">
               
                <div className='text-header flex  w-screen h-screen '>
                   
                    <div className='w-screen h-screen  absolute bottom-0 top-0 border-0 left-0 right-0 '>
                         <div className='inset-0   h-full w-full flex  relative '>
                            <ProductsFeatures></ProductsFeatures>
                         </div>
                    </div>

                    <div>
                      
                    </div>
                </div>
            </div>
        </>
    )
}