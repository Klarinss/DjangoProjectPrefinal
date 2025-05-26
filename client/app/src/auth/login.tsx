import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginData {
    username: string;
    password: string;
}
interface loginResponse {
    token: string,
    id: number,
    userType: string
}
const Login: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginData>({
        username: '',
        password: ''
    });
    
    const [error, setError] = useState<string>('');

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (error) {
            timer = setTimeout(() => {
                setError('');
            }, 5000);
        }

        
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [error]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post<loginResponse>('http://127.0.0.1:8000/kupal/login/', formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.id.toString());
            
            if (response.data.userType === 'seller') {
                navigate('/sellerDashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'May Mali Sign-in Again');
        }
    };

    return (
        <div className="  h-screen w-screen flex items-center justify-evenly bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative flex-col ">
           <div className='absolute top-0 bottom-0 left-0 right-0 '>
            <img className='w-full h-full object-cover' src="../../public/bg/outdoor-hiking-equipment.jpg" alt="" />
           </div>
           <h1 className='font-bold text-BgColor1'>Thrift Shop</h1>
            <div className="max-w-md w-full space-y-8 z-10">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-BgColor1">
                        Sign in to your Account
                    </h2>
                </div>
                <form className="mt-8 space-y-6 z-10" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className='mb-5 '>
                            <input
                                name="username"
                                type="text"
                                required
                                className=" pt-3 appearance-none rounded-md relative block w-full px-3 py-2 border-2 border-white placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-header focus:border-header focus:border-3 focus:z-10 text-lg "
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mt-5'>
                            <input
                                name="password"
                                type="password"
                                required
                                className=" text-lg appearance-none rounded-md relative block w-full px-3 py-2 border-2  border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-header focus:border-header focus:z-10  pt-3 focus:border-3"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='pt-5'>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;