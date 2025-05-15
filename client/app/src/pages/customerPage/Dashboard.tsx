import blinkVid from '../../assets/video/blink.mp4'
import binilogo from '../../assets/images/logo/bini-logo-allwhite.png'
import biniFlower from '../../assets/images/logo/flower.webp'
import biniWall from '../../assets/images/logo/bini-wall.webp'
import biniInsta from '../../assets/images/logo/icons8-instagram-50-colored.png'
import biniFacebook from '../../assets/images/logo/output-onlinepngtools.png'
import biniTiktok from '../../assets/images/logo/output-onlinepngtools (2).png'
import biniSpotify from '../../assets/images/logo/icons8-spotify-50-colored.png'
import biniX from '../../assets/images/logo/output-onlinepngtools (1).png'
import biniYoutube from '../../assets/images/logo/icons8-youtube-50-colored.png'
import bg from '../../assets/images/bg/bg2.webp'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card'
import Binibanner from '../../../public/biniBanner/viber_image_2025-04-30_10-29-18-628.webp'
export default function Dashboard() {
    const navigate = useNavigate();
    const [backGround, setBackGround] = useState(false)
    
    const SocmedLinks = [
        {
            id: 1,
            socmidImage: biniInsta
        },
        {
            id: 2,
            socmidImage: biniFacebook
        },
        {
            id: 3,
            socmidImage: biniTiktok
        },
        {
            id: 4,
            socmidImage: biniSpotify
        },
        {
            id: 5,
            socmidImage: biniX
        },
        {
            id: 6,
            socmidImage: biniYoutube
        },

    ]
    const handleChange = () => {
        if (window.scrollY >= 80) {
            setBackGround(true);
        } else {
            setBackGround(false)
        }

    }
    window.addEventListener('scroll', handleChange)



    return (
        <div className='w-screen h-auto relative '>
            <div className='fixed top-0 left-0 w-full h-full inset-0 -z-50'>
                <video
                    className='w-full h-full object-cover'
                    src={blinkVid}
                    muted
                    autoPlay
                    loop
                    playsInline
                />
            </div>
            <div className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 `}>
                <div className={`sticky  flex flex-row items-center justify-between  h-20 ${backGround && ' transition-all duration-300 ease-in-out bg-header'}`}>
                    <div className='ml-10 z-10'>
                        <img className='object-cover' src={binilogo} alt="" />
                    </div>
                    <div className='w-200 mr-5 '>
                        <ul className='flex justify-around text-xl  font-medium cursor-pointer'>
                            <li className='hover:text-hoverColor transition duration-150 ease-in-out' >Profile</li>
                            <li className='hover:text-hoverColor transition duration-150 ease-in-out'>Music</li>
                            <li className='hover:text-hoverColor transition duration-150 ease-in-out'>Videos</li>
                            <li className='hover:text-hoverColor transition duration-150 ease-in-out'>Gallery</li>
                            <li className='hover:text-hoverColor transition duration-150 ease-in-out' >Shop</li>
                            <li className='hover:text-hoverColor transition duration-150 ease-in-out'>Events</li>
                            <li className='hover:text-hoverColor transition duration-150 ease-in-out'>Articles</li>
                            <li className='hover:text-hoverColor transition duration-150 ease-in-out'>Subscribe</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className=' flex flex-1 screen z-20  items-center justify-between pt-190 flex-col rounded-b-xl h-auto'>
                <div className='pb-10 flex items-center justify-between w-full pl-10 '>
                    <div className='flex items-center justify-between w-45'>
                        <div className='flex flex-col cursor-pointer'>
                            <img src={biniFlower} alt="" />
                            <p className='font-medium'>Bini poll</p>
                        </div>
                        <div className='flex flex-col cursor-pointer'>
                            <img src={biniWall} alt="" />
                            <p className='font-medium'>Bini Wall</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-between w-70 cursor-pointer pr-5'>

                        {SocmedLinks.map(soc =>
                            <div key={soc.id} className='bg-white w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:-translate-y-1/2 transition duration-150 ease-in-out'>
                                <img className='h-6' src={soc.socmidImage} alt="" />
                            </div>


                        )}


                    </div>
                </div>
                <div className='w-screen bg-white rounded-2xl  mb-10 h-auto'>
                    <div className='relative h-2000 w-auto'>
                        <img className='object-cover h-full w-full' src={bg} alt="" />
                        <div className='  text-header absolute top-10 left-10 right-10 pb-10 flex flex-col  justify-center h-auto'>
                            <div className='flex justify-center flex-col items-center'>
                                <Card></Card>
                                <div className='pt-30 w-180 flex flex-col justify-center items-center'>
                                    <div >
                                        <img className='rounded-2xl h-full w-full object-cover cursor-pointer'  src={Binibanner} alt="" />
                                    </div>
                                    <button className='mt-10 bg-header text-white' type='submit'>Shop now </button>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}