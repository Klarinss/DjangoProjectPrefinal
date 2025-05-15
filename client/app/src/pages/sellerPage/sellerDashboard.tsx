
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
                <div className="fixed top-0 left-0 button-0  right-0 w-full h-full  -z-10  bg-white">
                    <img className='w-full h-full object-cover' src={bg} alt="" />
                </div>

                <div className='text-header flex  w-screen h-screen '>
                    <div className='flex flex-col p-5 bg-header shadow-inner w-52 z-10 '>
                        <div className='bg-header p-4 rounded-2xl '>
                            <img className='object-cover' src={logo} alt="" />
                        </div>
                        <ul className='text-white text-lg pt-10'>
                            <li className='pb-5 cursor-pointer text-xl'>Dashboard</li>
                            <li className='text-xl'>Products</li>
                        </ul>
                    </div>

                    <div className='w-screen h-screen  absolute bottom-0 top-0 border-0 left-0 right-0 '>
                         <div className='inset-0 p-10 pl-60 h-full w-full flex  relative '>
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