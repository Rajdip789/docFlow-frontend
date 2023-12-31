import Home from './_root/pages/Home';
import UserDocs from './_root/pages/UserDocs';
import AuthLayout from './auth/AuthLayout';
import SigninForm from './auth/forms/SigninForm';
import SignupForm from './auth/forms/SignupForm';
import RequireAuth from './components/shared/RequireAuth';
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

        <Route element={<RequireAuth/>}>
          <Route path='/home' element={<UserDocs/>} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
