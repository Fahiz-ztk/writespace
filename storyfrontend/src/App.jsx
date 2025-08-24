import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer, toast } from 'react-toastify';
import { Route,Routes } from 'react-router-dom';
import AllStories from './components/AllStories';
import CreateStory from './components/CreateStory';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ViewStory from './components/ViewStory';
import Creator from './components/Creator';
import Editor from './components/Editor';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<AllStories/>} />
        <Route path='/create' element={<CreateStory/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/creator' element={<Creator/>} />
        <Route path='/view/:id' element={<ViewStory/>} />
        <Route path='/edit/:id' element={<Editor/>} />
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App
