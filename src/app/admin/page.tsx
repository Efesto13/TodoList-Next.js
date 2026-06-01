'use client'

import { getTasks } from '@/services/task';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface personeProps{
  nombre: string
  edad: number
  le_mide: string
}

export const User = () => {
  const [user, setUser] = useState<personeProps>();
  const router = useRouter();

  const goToBack= () => {
    router.back();
  };
  
    const fectchData = async () => {
        const result = await getTasks()
        setUser(result)
    };

    useEffect(()=>{fectchData()},[]) 

  return(
    <div>
        <h1>Vista de Admin</h1>
        <div>{user && user.nombre}</div>
        <div>{user?.le_mide}</div> 
        <button className="bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition-colors duration-200 active:scale-95 transform" onClick={goToBack}>back</button>
    </div>
  )

};

export default User
