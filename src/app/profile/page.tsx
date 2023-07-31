"use client";

import axios from 'axios';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState(null)

    useEffect(() => {
        const getUserData = async() => {
            const res = await axios.get('/api/users/me')
            setData(res.data.data._id)
        }
        getUserData();
    }, [])

    const logout = async () => {
    try {
        await axios.get('/api/users/logout')
        toast.success('Logout Successful!')
        router.push('/login')
    } catch (error: any) {
        toast.error(error.message)
    }
    };
    return (
        <>
        <Toaster />
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <h2>{data ? <Link href={`/profile/${data}`}>Visit Profile</Link> : "Loading"}</h2>
            <hr />
            <p>Profile Page</p>
            <hr />
            <button className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>Logout</button>
        </div>
        </>
    )
}