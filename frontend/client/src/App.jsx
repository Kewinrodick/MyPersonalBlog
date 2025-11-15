import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Article from './pages/Article'
import Login from './pages/Login'
import SignUp from './pages/signUp'
import { ToastContainer } from 'react-toastify';


import './index.css'
import ArticleEdit from './pages/ArticleEdit'
import AddArticle from './pages/AddArticle'

const App = () => {
  return (
    

      <div className=''>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/articles/:id' element={<Article/>}/>
          <Route path='/articles/edit/:id' element={<ArticleEdit/>}/>
          <Route path="/user/login" element = {<Login/>}/>
          <Route path="/user/signup" element = {<SignUp/>}/>
          <Route path="/articles/add" element = {<AddArticle/>}/>
          
        </Routes>
        <ToastContainer />
      </div>

  )
}

export default App
