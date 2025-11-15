import React, { useEffect, useState ,useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

import AnimatedList from '../components/AnimetedItems';

import { AuthContext } from '../context/MainContext';
const Home = () => {
  const [articles,setArticles] = useState([]);

  const {user,logout} = useContext(AuthContext);

  useEffect(()=>{
    async function fetchArtcles(){
        try{
          const myArticles = await axios.get('http://localhost:5001/api/articles/');
          setArticles(myArticles.data);
        }catch(err){
          console.log(err.message);
        }
    }
  fetchArtcles();
  },[])

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  const handleLogout = async()=>{
    try{
      await logout();

    }catch(err){
      console.log(err.message);
    }
  }


 
  return (
    <div className='min-h-screen flex justify-center items-center bg-[#54342A]'>
      <div className='shadow-2xl shadow-[#694337] rounded-2xl px-10 py-5 md:px-20 md:py-10 bg-[#3A2016] min-h-100 w-100 md:w-150 lg:w-160 wrap'>
        <header className='mb-6 flex justify-between items-center border-b-2 pb-5 border-[#A57A5F]'> 
          <h2 className='font-handlee text-3xl md:text-4xl lg:text-5xl  text-[#A57A5F]  '>Blogs</h2>
            
          {user? 
            <div className='flex gap-5 items-center'>
              {user.role === 'admin' && 
                <Link to='/articles/add'  className='bg-[#A57A5F] text-[#54342A] font-bold py-2 rounded-lg hover:bg-[#c69b7c] transition-all duration-300  font-handlee border-2 px-3'>
                 + Add
                </Link>
              }
              <button className='bg-[#A57A5F] text-[#54342A] cursor-pointer font-bold border-[#54342A] border-2  font-handlee py-2 rounded-lg hover:bg-[#c69b7c] transition-all duration-300 px-3 ' 
              onClick={handleLogout}>
                Logout
              </button>
              <div className='profile border-2 p-2 py-3 text-[#A57A5F] border-[#A57A5F] rounded-full cursor-pointer'>
              {/* <FontAwesomeIcon icon={faUser} className="text-[#A57A5F] text-2xl" /> */}
              ⚆_⚆
              </div>
            </div>
            
            :
            <Link to={'/user/login'} className = 'bg-[#A57A5F] text-[#54342A] font-bold py-2 rounded-lg hover:bg-[#c69b7c] transition-all duration-300 text-xl font-handlee border-2 px-2'>
              Login
            </Link>
          }
          
        </header>
        
        <div className='flex'>
          <AnimatedList
            items={articles}
            
            onItemSelect={(item, index) => console.log(item, index)}
            showGradients={true}
            enableArrowNavigation={true}
            displayScrollbar={true}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
