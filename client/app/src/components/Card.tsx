import { useState } from "react"

import { IoIosArrowForward,IoIosArrowBack  } from "react-icons/io";


export default function Card(){
  const[index,SetIndex]=useState(0)
    interface BiniProps{
        id:number
    name?:string
    fullname:string,
    image:string,
    birthday?:string,

    }
 const Bini:BiniProps[]=[
    {
        id:0,
        fullname:'Maraiah Queen Arceta',
        name:"AIAH",
        birthday:'January 27, 2001',
        image:'../../public/BiniImages/BINI-AIAH.webp'
    },
    {
        id:1,
        fullname:'Ma. Nicolette Vergara',
        name:'COLET',
        birthday:'September 14, 2001',
        image:'../../public/BiniImages/BINI-COLET.webp'
    },
    {
        id:2,
        fullname:'Gweneth L. Apuli',
        name:'GWEN',
        birthday:'June 19, 2003',
        image:'../../public/BiniImages/BINI-GWEN.webp'
    },
    {
        id:3,
        fullname:'Mary Loi Yves Ricalde',
        name:'MALOI',
        birthday:'May 27, 2002',
        image:'../../public/BiniImages/BINI-MALOI.webp'
    },
    {
        id:4,
        fullname:'Jhoanna Christine Robles',
        name:'JHOANNA',
        birthday:'January 26, 2004',
        image:'../../public/BiniImages/BINI-JHOANNA.webp'
    },
    {
        id:5,
        fullname:'Mikhaela Janna Lim',
        name:'MIKHA',
        birthday:'November 8, 2003',
        image:'../../public/BiniImages/BINI-MIKHA.webp'
    },
    {
        id:6,
        fullname:'Sheena Mae Catacutan',
        name:'SHEENA',
        birthday:'May 9, 2004',
        image:'../../public/BiniImages/BINI-SHEENA.webp'
    },
    {
        id:7,
        fullname:'Stacey Aubrey Sevilleja',
        name:'STACEY',
        birthday:'July 13, 2003',
        image:'../../public/BiniImages/BINI-STACEY.webp'
    },
    
   
 ]   
  const  bini=Bini[index]
   

  const handleNext=()=>{
      const hasNext=Bini.length-1
     if(index < hasNext){
        SetIndex(index +1)
     }else{
        SetIndex(0)
     }
  }
  const handlePrev=()=>{
     if(index > 0){
        SetIndex(index -1)
     }else{
        SetIndex(Bini.length -1)
     }

  }


    return(
    <>
   <div className="flex h-auto w-auto justify-center items-center">
                <div className="relative grid h-130 w-90 pb-15 pr-5 pl-5 pt-5  shadow-initial bg-white rounded-2xl" >
                    <img className="object-cover w-full h-full rounded-lg transition-all duration-150 ease-out"  src={bini.image} alt="" />
                    <div className="  absolute bottom-5 left-30 right-40 flex w-100">
                        <IoIosArrowBack className="cursor-pointer text-3xl" onClick={handlePrev}></IoIosArrowBack>
                        <p className="pr-3 pl-3 text-xl">{index +1}/{Bini.length}</p>
                        <IoIosArrowForward className="text-3xl cursor-pointer" onClick={ handleNext}></IoIosArrowForward>
                        
                    </div>
                </div>
               <div className="flex flex-col pl-10 pr-10 w-120 text-textColor">
                 <h1 className="text-4xl font-semibold text-textColor">BINI</h1>
                 <b className="text-5xl text-header pt-5 pb-5">{bini.name}</b>
                <b className="text-md">Full Name:<span className="pl-4 font-normal text-lg">{bini.fullname}</span></b>
                <b className="pt-4 text-md">Date of Birth:<span className="pl-5 font-normal text-lg">{bini.birthday}</span> </b>

               </div>
               <div className="h-100 bg-header w-1">
               </div>

               <div className="">
                {Bini.map(bini=>{
                    return <p key={bini.id} className={`pl-5 pt-1 text-textColor text-lg`}>{bini.name}</p>
                })}
               </div>
            </div>
    
    </>
    
)
}