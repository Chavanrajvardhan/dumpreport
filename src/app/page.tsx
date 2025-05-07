'use client'

import axios from "axios";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

export default function Login() {
const router = useRouter()
const data = {
     userName : 'jjcore2023@gmail.com',
     password :'jjcore2023@gmail.com'
}


async function login(){
    console.log('click')
     const response = await axios.post('https://testuatgate.rediport.in/api/UserLogin/Login',data)
     const token = response.data.token 
     Cookies.set('authToken', token, { expires: 1 })
     if(token){
      router.push('/home')
     }
    
}




  return (
    <>
      <h1>Login page</h1>
      <button  className = "bg-blue-300" onClick={login}>Login</button>
    </>
  
    
  );
}
