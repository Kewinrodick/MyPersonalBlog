import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

const ArticleEdit = () => {
  const { id } = useParams();

  const [article, setArticle] = useState(null);

  // Editable fields
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await axios.get(`http://localhost:5001/api/articles/${id}`);

        setArticle(res.data);

        
        setNewTitle(res.data.title);
        setNewContent(res.data.content);

      } catch (err) {
        console.log(err.message);
      }
    }

    fetchArticle();
  }, [id]);

 
  if (!article) {
    return (
      <h2 className="mx-auto w-10 mt-[30%]">
        <AiOutlineLoading3Quarters className="text-4xl animate-spin text-[#A57A5F]" />
      </h2>
    );
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:5001/api/articles/${id}`,
        {
          title: newTitle,
          content: newContent,
        }
        ,{withCredentials:true}
      );

      if (res.status === 200) {
        console.log("Article updated successfully!");
        toast.success("Article Updated!");
          
        navigate('/')
      }
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="h-screen w-screen">
      <div className="flex justify-center pt-10">
        <form
          className="shadow-2xl shadow-[#694337]/50 rounded-2xl px-10 py-5 md:px-20 md:py-10 bg-[#3A2016] w-100 md:w-150 lg:w-200"
          onSubmit={handleSubmit}
        >
          <div className="md:flex justify-between items-baseline">
            <div>
              
              <input
                type="text"
                className="font-handlee text-3xl md:text-5xl text-[#A57A5F] pl-2 border-2 rounded-2xl mb-4 py-2 bg-transparent"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />

              <p className="text-lg text-[#A57A5F]/40 mb-4">
                {new Date(article.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

        
          <textarea
            className="text-xl text-[#A57A5F] leading-loose md:w-108 lg:w-160 h-80 border-2 rounded-2xl p-2 overflow-y-auto bg-transparent w-80"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#A57A5F #3A2016",
            }}
          />

          <button
            className="bg-[#A57A5F] text-[#54342A] font-bold py-2 rounded-lg hover:bg-[#c69b7c] transition-all duration-300 text-xl font-handlee border-2 px-2 md:px-5 max-h-10 cursor-pointer mt-5"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ArticleEdit;
