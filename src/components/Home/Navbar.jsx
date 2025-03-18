// import React, { useContext } from "react";
// import { assets } from "../../assests/assets";
// import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
// import { AppContent } from "../../context/AppContext";
// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify";
// export const Navbar = () => {
//     const navigate = useNavigate();
//     const {userData, backendUrl, setUserData, setIsLoggedin} =useContext(AppContent);
//     // console.log(userData);

// const logout=async()=>{
//   try {
//     axios.defaults.withCredentials=true;
//     const {data} = await axios.post(backendUrl+'/api/auth/logout');
//     data.success && setIsLoggedin(false);
//     data.success && setUserData(false);
//     navigate("/developer");
//   } catch (error) {
//     toast.error(error.message);
//   }
// }
// const sendVerificationotp= async()=>{

//   try {
//       axios.defaults.withCredentials=true;
//     const {data }  = await  axios.post(backendUrl+"/api/auth/send-verify-otp");
//     if (data.success) {
//     navigate('/email-verify');
//     toast.success(data.message)
//     }else{
//     toast.error("data.message")
//     }
//   } catch (error) {
//     toast.error(error.message)
//   }
  
// }
//   return (
//     <div className="w-full flex justify-between items-center p-4 sm:p-6 bg-white shadow-md">

//       <img src={assets.logo} alt="Logo" className="w-28 cursor-pointer" />
//       {userData? 
//       <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white group">
//           {userData.name[0].toUpperCase()}
//           <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10 mt-3">
//             <ul className="list-none m-0 p-2 bg-gray-l00 text-sm">
//               {!userData.isAccountverified && <li onClick={sendVerificationotp } className="py-l px-2 hover:bg-gray-200 cursor-pointer">Verify email</li>
//               }
//               <li onClick={logout} className="py-l px-2 hover:bg-gray-200 cursor-pointer">Logout</li>
//             </ul>
//           </div>
//       </div>
//        :
//       <button className="flex items-center gap-2 text-gray-800 font-medium hover:text-blue-600 transition border border-gray-500 rounded-full px-6 py-2" onClick={() => navigate("/login")}>Login <img src={assets.arrow_icon} alt="Arrow Icon" className="w-5" />
//       </button>
//       }
      
//     </div>
//   );
// };


import React, { useContext, useState } from "react";  // Added useState for loader
import { assets } from "../../assests/assets";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { AppContent } from "../../context/AppContext";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const Navbar = () => {
    const navigate = useNavigate();
    const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);
    const [loading, setLoading] = useState(false);  // Added loading state

    const logout = async () => {
        setLoading(true);  // Show loader during logout
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + '/api/auth/logout');
            if (data.success) {
                setIsLoggedin(false);
                setUserData(false);
                navigate("/developer");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);  // Hide loader after logout
        }
    };

    const sendVerificationotp = async () => {
        setLoading(true);  // Show loader during verification
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + "/api/auth/send-verify-otp");
            if (data.success) {
                navigate('/email-verify');
                toast.success(data.message);
            } else {
                toast.error("data.message");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);  // Hide loader after verification
        }
    };

    return (
        <div className="w-full flex justify-between items-center p-4 sm:p-6 bg-white shadow-md relative">
            
            {loading && <Loader />}  {/* Loader displayed during loading */}
            
            <img src={assets.logo} alt="Logo" className="w-28 cursor-pointer" />
            
            {userData ? (
                <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white group">
                    {userData.name[0].toUpperCase()}
                    <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10 mt-3">
                        <ul className="list-none m-0 p-2 bg-gray-l00 text-sm">
                            {!userData.isAccountverified && (
                                <li onClick={sendVerificationotp} className="py-l px-2 hover:bg-gray-200 cursor-pointer">
                                    Verify email
                                </li>
                            )}
                            <li onClick={logout} className="py-l px-2 hover:bg-gray-200 cursor-pointer">
                                Logout
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <button 
                    className="flex items-center gap-2 text-gray-800 font-medium hover:text-blue-600 transition border border-gray-500 rounded-full px-6 py-2" 
                    onClick={() => navigate("/login")}
                >
                    Login 
                    <img src={assets.arrow_icon} alt="Arrow Icon" className="w-5" />
                </button>
            )}
        </div>
    );
};

// ✅ Loader component added in the same file
const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="loader border-4 border-blue-500 border-t-transparent w-16 h-16 rounded-full animate-spin"></div>
    </div>
  );
};
