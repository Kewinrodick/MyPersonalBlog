import React, { useEffect, useState } from "react";
import { useParams,Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  const [role, setRole] = useState(() => {
  const saved = localStorage.getItem("user");
  return saved ? JSON.parse(saved).role : null;
});

  const navigate = useNavigate();


  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await axios.get(`http://localhost:5001/api/articles/${id}`);
        setArticle(res.data);
        console.log(role)
     
      } catch (err) {
        console.log(err.message);

      }
    }
    fetchArticle();
  }, [id]);

  if (!article) 
    return <h2 className="mx-auto w-10 mt-[30%]">
            <AiOutlineLoading3Quarters className="text-4xl animate-spin text-[#A57A5F]" />
            </h2>;

   async function handleDelete() {
      try {
        const res = await axios.delete(`http://localhost:5001/api/articles/${id}`,{withCredentials:true});

        if(res.status === 200){
            setArticle(null);
            navigate('/');
            toast.success("Deleted Successfully!");
        }

      } catch (err) {
        console.log(err.message);
        toast.error(err.message);
      }
  }
  return (
    <div className="h-screen w-screen">
      <div className="flex justify-center pt-10" >
          <div className='shadow-2xl shadow-[#694337]/50 rounded-2xl px-10 py-5 md:px-20 md:py-10 bg-[#3A2016] w-100 md:w-150 lg:w-200 wrap'>
            <div className="md:flex  justify-between items-baseline">
              <div>
                <h1 className="font-handlee text-3xl md:text-5xl  text-[#A57A5F]">{article.title}</h1>
                <p className="text-lg text-[#A57A5F]/40 mb-4">
                    {new Date(article.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                    })}
                </p>
              </div>
            {role && 
              <div className="flex gap-5 mb-4 ">
                <Link to={`/articles/edit/${id}`} className="bg-[#A57A5F] text-[#54342A] font-bold py-2 rounded-lg
                hover:bg-[#c69b7c] transition-all duration-300 text-xl font-handlee border-2 px-2 max-h-10 md:px-5 cursor-pointer">
                  Edit
                </Link>
                <button className="bg-[#A57A5F] text-[#54342A] font-bold py-2 rounded-lg
                hover:bg-[#c69b7c] transition-all duration-300 text-xl font-handlee border-2 px-2 md:px-5 max-h-10 cursor-pointer" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            }
            </div>

            <p className="text-xl text-[#A57A5F] scroll-my-11 leading-loose">{article.content}</p>
          </div>

      </div>
    </div>
  );
};

export default ArticlePage;
