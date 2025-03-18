import React, { useContext, useState } from "react";
import { assets } from "../../assests/assets";
import { Navigate, useNavigate } from "react-router-dom";
import { AppContent } from "../../context/AppContext";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
// import Loader from "../Loader";
//  import ButtonWithLoader from "../Loader";
import "react-toastify/dist/ReactToastify.css";
import ButtonWithLoader from "../Loader";
// import resetPassword from 
export default function  Login () {

  // using of backend from APPcontennt provide using useContextHook
  const {backendUrl, setIsLoggedin,getUserData} = useContext(AppContent)
  const [state , setState] = useState("Login");
  const [isSignUp, setIsSignUp] = useState(false);
  const [name , setName ] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle login or Sign Up logic here
  //   // console.log(isSign Up ? "Signing Up" : "Logging In", { email, password });
  // };
// const onSubmitHandler = async(e)=>{
//   try {
//     e.preventDefault();
//     axios.defaults.withCredentials=true;{/* pass cookies also */}
//     if (state==="Sign Up") {
//       const {data} = await axios.post(backendUrl+"/api/auth/register",{name , email, password});
//       if (data.success) {
//         setIsLoggedin(true);
//         Navigate()
//       }else{
//         // toast.error(data.message);
//         toast.error(error?.response?.data?.message || "Something went wrong");
//       }
//     }else{
//       // if state is not Sign Up
//       const {data} = await axios.post(backendUrl+"/api/auth/login",{ email, password});
//       if (data.success) {
//         setIsLoggedin(true);
//         Navigate("/developer")
//       }else{
//         toast.error(data.message);
//       }

//     }
//   } catch (error) {
//     toast.error(error);
//   }
// }
const onSubmitHandler = async (e) => {
  setLoading(true); // Show loader
  // toast.success("Login successful! 🎉"); // ✅ Toast should work
  try {
    e.preventDefault();
    // toast.error(data.message);
     
    
   
    axios.defaults.withCredentials = true; // Pass cookies also

    if (state === "Sign Up") {
      const { data } = await axios.post(backendUrl + "/api/auth/register", {
        name,
        email,
        password,
      });

      if (data.success) {
        toast.success(data.message);
        getUserData()
        setIsLoggedin(true);
        Navigate("/developer");
      } else {
        toast.error(data.message); // This should be correct, as data is defined here
      }
    } else {
      // If state is not Sign Up
      const { data } = await axios.post(backendUrl + "/api/auth/login", {
        email,
        password,
      });

      if (data.success) {
        toast.success(data.message);
        getUserData();
        setIsLoggedin(true);
        Navigate("/developer");
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {
    // Properly handling errors
    toast.error(error?.response?.data?.message || "Something went wrong");
  }
  finally {
    setLoading(false); // Hide loader after request completes
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-t from-blue-200 to-purple-400">
       <img src={assets.logo} alt="" className="absolute left-5 top-5 sm:left-20 sm:w-32 cursor-pointer" />
       <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
          <h2 className="text-3xl font-semibold text-white text-center mb-3'">{state==="Sign Up"?"Create Account" :"Login"}</h2>
          <p className="text-center mb-6 text-sm">{state==="Sign Up"?"Create Your Account" :"Login To Your Account"}</p>
          {/* form for the only the full name  */}

          <form onSubmit={onSubmitHandler}>
            {/* this full name will only be dispalyed when state === "Sign Up" */}
            {state ==="Sign Up" && (
              <div className=" mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]" >
                <img src={assets.person_icon} alt-/> {/*on changing this input field  we willl save it in setName &&  also to connect with its state we will use value = {name}*/}
                <input onChange={e=>setName(e.target.value)} value={name} type="text" className= "bg-transparent outline-none" placeholder= "Full Name" required />
            </div>)
            }
            

            {/* form for password and email below  */}
            <div className=" mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]" >
                <img src={assets.mail_icon} alt-/>
                <input  onChange={e=>setEmail(e.target.value)} value={email} type="email" className= "bg-transparent outline-none" placeholder= "Email" required />
            </div>

            <div className=" mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]" >
                <img src={assets.lock_icon} alt-/>
                <input  onChange={e=>setPassword(e.target.value)} value={password} type="password" className= "bg-transparent outline-none" placeholder= "password" required />
            </div>

            {/* adding forot password  */}
            <p onClick={()=>Navigate("/reset-password")} className="mb-4 text-indigo-500 cursor-pointer">Forgot Password?</p>
            {/* <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">{state}</button> */}
            <ButtonWithLoader state={state} loading={loading} />
          </form>
        

         
         {/*  */}
         {state ==="Sign Up" ?(
            <p className="text-gray-400 text-center text-xs mt-4">Already have a account?{" "}
              <span onClick={()=>setState("Login")} className="text-blue-400 cursor-pointer underline">Login here</span>
          </p>

         ):(

          <p className="text-gray-400 text-center text-xs mt-4">Don't have a account?{" "}
            <span onClick={()=>setState("Sign Up")} className="text-blue-400 cursor-pointer underline">Sign Up</span>
          </p>
         )}
         
          

        </div>  
    </div>
  );
};

// export default Login;