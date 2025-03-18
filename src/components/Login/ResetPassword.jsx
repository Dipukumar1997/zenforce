// import React, { useContext, useState } from 'react'
// import { assets } from '../../assests/assets';
// import { AppContent } from '../../context/AppContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { Navigate, useNavigate } from 'react-router-dom';
// const ResetPassword = () => {
//   const [email , setEmail] =useState("");
//   const [newPassword , setNewPassword] = useState("");
//   const inputRefs = React.useRef([]);
//   const {backendUrl} = useContext(AppContent);
//   axios.defaults.withCredentials = true;
//   const navigate = useNavigate();

//   //hiding the form and showing the new form 
//   const [ isEmailSent,setIsEmailSent ] = useState("");
//   const [otp , setOtp] = useState(0);
//   const [isOtpSubmited , setIsOtpSubmited] = useState(false);
  
// const handleInput = (e, index)=>{
//     if (e.target.value.length>0 && index<inputRefs.current.length-1) {
//         inputRefs.current[index+1].focus();
//     }
// }

// const onSubmitOtp = async (e)=>{
//   e.preventDefault();
//   const otpArray = inputRefs.current.map(e=>e.value);
//   setOtp (otpArray.join(""));
//   setIsOtpSubmited(true);
// }
// const onSubmitEmail = async(e)=>{
//   e.preventDefault();
//   try {
//     const {data} = await axios.post(backendUrl+"/api/auth/send-reset-otp",{email });
//     data.success?toast.success(data.message):toast.error(data.message);
//     data.success && setIsEmailSent(true);
//   } catch (error) {
//     toast.error(error.message)
//   }
// }

// const onSubmitNewPassword = async(e)=>{
//   e.preventDefault();
//   try {
//     const {data} = await axios.post(backendUrl+"/api/auth/reset-password",{email , otp , newPassword});
//     data.success?toast.success(data.message):toast.error(data.message);
//     data.success && navigate("/login");
//   } catch (error) {
//     toast.error(error.message)
//   }
// }
// const handlekeyDown =(e, index)=>{
//     if (e.target.value==='' && InputEvent.key ==='Backspace' && index>0) {
//         inputRefs.current[index-1].focus();
//     }
// }
// const handlePaste=(e)=>{
//     const paste = e.clipboardData.getData('text');
//     const pasteArray = paste.split('');
//     pasteArray.forEach((char,index)=>{
//         if (inputRefs.current[index]) {
//             inputRefs.current[index].value=char;
//         }
//     })
// }


//   return (
    
//     <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-t from-blue-200 to-purple-400'>
//          <img src={assets.logo} alt="" className="absolute left-5 top-5 sm:left-20 sm:w-32 cursor-pointer" />
//          {/* form  enter email id for restting the password  */}

// {!isEmailSent &&
//   <form onSubmit={onSubmitEmail} className='bg-slate-900  p-8 rounded-lg shadow-lg w-96 text-sm'>
//     <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
//     <p className='text-center mb-6 text-indigo-300'>Enter the registered email address</p>
//     <div className='mb-4 flex items-center gap-3 py-2.5 px-5 rounded-full bg-[#333A5C]'>
//         <img src={assets.mail_icon} className='w-3 h-3' value={email} ></img>
//         <input type="email" placeholder='Email id' className='bg-transparent outline-none text-white' onChange={e=>setEmail(e.target.value)} required/>
//     </div>
//     <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3'> Submit</button>
//   </form>
// }
//  {/* otp input form */}
// {!isOtpSubmited && isEmailSent &&
        
//   <form onSubmit={onSubmitOtp} className='bg-slate-900  p-8 rounded-lg shadow-lg w-96 text-sm'>
//       <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset  Password OTP</h1>
//       <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code to your email id</p>
//       <div className='flex justify-between mb-8' onPaste={handlePaste}>
//           {Array(6).fill(0).map((_,index)=>(
//               <input type="text" maxLength='1' key={index} required className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md' ref={e=>inputRefs.current[index]=e} onInput={(e)=>handleInput(e,index)} onKeyDown={(e)=>handlekeyDown(e,index)}/>
//           ))}
//       </div>
//       <button className=' w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-full'>Submit</button>
//   </form>
// }

//  {/* enter new pssword  */}
// {isOtpSubmited && isEmailSent &&
       
//   <form onSubmit={onSubmitNewPassword} className='bg-slate-900  p-8 rounded-lg shadow-lg w-96 text-sm'>
//     <h1 className='text-white text-2xl font-semibold text-center mb-4'>New Password</h1>
//     <p className='text-center mb-6 text-indigo-300'>Enter the new password</p>
//     <div className='mb-4 flex items-center gap-3 py-2.5 px-5 rounded-full bg-[#333A5C]'>
//         <img src={assets.lock_icon} className='w-3 h-3' value={newPassword} ></img>
//         <input type="password" placeholder=' Enter your new password' className='bg-transparent outline-none text-white' onChange={e=>setNewPassword(e.target.value)} required/>
//     </div>
//     <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3'> Submit</button>
//     </form>
//  }
//     </div>
//   )
// }

// export default ResetPassword;

import React, { useContext, useState } from 'react';
import { assets } from '../../assests/assets';
import { AppContent } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';  // Import Loader

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const inputRefs = React.useRef([]);
  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSubmited, setIsOtpSubmited] = useState(false);

  const [loading, setLoading] = useState(false);  // Loader state

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map(e => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmited(true);
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);  // Show loader
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) {
        setIsEmailSent(true);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);  // Hide loader
    }
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    setLoading(true);  // Show loader
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, { email, otp, newPassword });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) {
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);  // Hide loader
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.target.value === '' && e.key === 'Backspace' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-t from-blue-200 to-purple-400'>
      <img src={assets.logo} alt="logo" className="absolute left-5 top-5 sm:left-20 sm:w-32 cursor-pointer" />

      {loading ? (
        <Loader />  // Show loader during the loading state
      ) : (
        <>
          {/* Form to enter email */}
          {!isEmailSent && (
            <form onSubmit={onSubmitEmail} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
              <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
              <p className='text-center mb-6 text-indigo-300'>Enter the registered email address</p>
              <div className='mb-4 flex items-center gap-3 py-2.5 px-5 rounded-full bg-[#333A5C]'>
                <img src={assets.mail_icon} className='w-3 h-3' alt="mail icon" />
                <input
                  type="email"
                  placeholder='Email id'
                  className='bg-transparent outline-none text-white w-full'
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3'>
                Submit
              </button>
            </form>
          )}

          {/* OTP input form */}
          {!isOtpSubmited && isEmailSent && (
            <form onSubmit={onSubmitOtp} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
              <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password OTP</h1>
              <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code sent to your email</p>
              <div className='flex justify-between mb-8' onPaste={handlePaste}>
                {Array(6).fill(0).map((_, index) => (
                  <input
                    type="text"
                    maxLength='1'
                    key={index}
                    required
                    className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
                    ref={el => inputRefs.current[index] = el}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>
              <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-full'>
                Submit
              </button>
            </form>
          )}

          {/* New Password form */}
          {isOtpSubmited && isEmailSent && (
            <form onSubmit={onSubmitNewPassword} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
              <h1 className='text-white text-2xl font-semibold text-center mb-4'>New Password</h1>
              <p className='text-center mb-6 text-indigo-300'>Enter the new password</p>
              <div className='mb-4 flex items-center gap-3 py-2.5 px-5 rounded-full bg-[#333A5C]'>
                <img src={assets.lock_icon} className='w-3 h-3' alt="lock icon" />
                <input
                  type="password"
                  placeholder='Enter your new password'
                  className='bg-transparent outline-none text-white w-full'
                  onChange={e => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3'>
                Submit
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default ResetPassword;
