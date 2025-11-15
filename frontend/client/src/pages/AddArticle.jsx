import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddArticle = () => {
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      const res = await axios.post('http://localhost:5001/api/articles/',{title,content},{withCredentials:true});
      console.log(res)
      if(res.status === 201 ){
        navigate('/');
        toast.success("Article created!");
      }

    }catch(err){
      console.log(err.response?.data?.message);
      toast.error(err.response?.data?.message);
    }
  }
  return (
      <div className='h-screen w-screen'> 
      <div className='flex justify-center pt-10'>
        <form action="" className="shadow-2xl shadow-[#694337]/50 rounded-2xl px-10 py-5 md:px-20 md:py-10 bg-[#3A2016] w-90 md:w-150 lg:w-200 " onSubmit={handleSubmit}>
          <legend className='font-handlee text-3xl md:text-5xl text-[#A57A5F] pl-2  rounded-2xl mb-4 py-2 bg-transparent'>New Article</legend>

          <div className='flex flex-col gap-5'>
            <div className='flex items-center md:gap-4'>
              <label htmlFor="" className='text-[#A57A5F] text-2xl font-handlee' >Title:</label>
              <input type="text" className='border-2 rounded-2xl py-1 text-[#A57A5F] px-4 ml-8' onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className='flex items-center gap-4'>
              <label htmlFor="" className='text-[#A57A5F] text-2xl font-handlee' >Content:</label>
              <textarea className='border-2 rounded-2xl h-40 w-200 text-[#A57A5F] p-4' onChange={(e)=>setContent(e.target.value)}></textarea>
            </div>
           <button
            className="bg-[#A57A5F] text-[#54342A] font-bold py-2 rounded-lg hover:bg-[#c69b7c] transition-all duration-300 text-xl font-handlee border-2  max-h-10 cursor-pointer mt-5 max-w-25 text-center"
            type="submit"
          >
            + Add
          </button>
          </div>

        </form>
      </div>
      </div>
  )
}

export default AddArticle
