import React, { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login'); // Track whether the form is in 'Login' or 'Sign Up' mode
  const { token, setToken, navigate, backendUrl } = useContext(TaskContext); // Access context values
  const [name, setName] = useState('');
  const [password, setPasword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      if (currentState === 'Sign Up') {
        // Handle sign-up logic
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (response.data.success) {
          setToken(response.data.token); // Save token in context state
          localStorage.setItem('token', response.data.token); // Persist token in localStorage
        } else {
          toast.error(response.data.message); // Display error notification
        }
      } else {
        // Handle login logic
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (response.data.success) {
          setToken(response.data.token); // Save token in context state
          localStorage.setItem('token', response.data.token); // Persist token in localStorage
        } else {
          toast.error(response.data.message); // Display error notification
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message); // Handle API errors
    }
  };

  // Redirect to the home page if the user is authenticated (token exists)
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
    >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      
      {/* Render the Name field only for Sign Up mode */}
      {currentState === 'Login' ? '' : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Name'
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
        required
      />

      <input
        onChange={(e) => setPasword(e.target.value)}
        value={password}
        type="password"
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Password'
        required
      />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currentState === 'Login' 
            ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
            : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>

      {/* Dynamic button text based on form mode */}
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
