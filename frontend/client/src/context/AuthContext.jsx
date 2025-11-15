import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from 'react-toastify';
import { AuthContext } from "./MainContext";

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null);
  


    useEffect(()=>{
      const storedUser = localStorage.getItem("user");
      if(storedUser)setUser(JSON.parse(storedUser));
    },[])

    const signup = async (user_name, email, password) => {
        try{

        const res = await axios.post(
            "http://localhost:5001/api/auth/signup",
            { user_name, email, password },
            { withCredentials: true });

          console.log(res)
         if(res.status === 201 && res.data.user ){
            
            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
             
            toast.success("Account created and Loged In!")
        }
        }catch(err){
              toast.error(err.response?.data?.message || "Something went wrong");
                console.log(err);
        }
    };

    const login = async(email,password)=>{
        try{

            const res = await axios.post("http://localhost:5001/api/auth/login",
                            { email, password },
                            { withCredentials: true }
                        );

            if(res.status === 200 && res.data.user){
                
              
                setUser(res.data.user);
                
                localStorage.setItem("user",JSON.stringify(res.data.user));
                toast.success("Account Logged In!")
            }else{
                throw new Error("Unable to login");
            }
        }catch(err){
             toast.error(err.response?.data?.message || "Something went wrong");
        }
    }
    const logout = async () => {
        try {
            const res = await axios.post(
                "http://localhost:5001/api/auth/logout",
                {},
                { withCredentials: true }
            );
             if(res.status === 200 && !res.data.user){
                toast.success("Account Logged Out!")
            }else{
                throw new Error("Unable to logout");
            }
        } catch (err) {
            console.log("Logout error:", err.message);
        } finally {
            setUser(null);
            localStorage.removeItem("user");
        }
    };


     return (
            <AuthContext.Provider value={{ user, login, logout ,signup }}>
                {children}
            </AuthContext.Provider>
     );
}
