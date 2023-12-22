import Home from './_root/pages/Home';
import AuthLayout from './auth/AuthLayout';
import SigninForm from './auth/forms/SigninForm';
import SignupForm from './auth/forms/SignupForm';
import './globals.css';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        <Route index element={<Home/>} />
        
        <Route element={<AuthLayout/>}>
          <Route path='/sign-in' element={<SigninForm />} />
          <Route path='/sign-up' element={<SignupForm />} />
        </Route>
      
      </Routes>
    </main>
  )
}

export default App
