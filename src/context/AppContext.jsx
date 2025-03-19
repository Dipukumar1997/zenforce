// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios"
// export const AppContent = createContext();

// export const AppContextProvider = (props) => {
//   axios.defaults.withCredentials =true;
//   // Corrected environment variable usage
// //   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//     const backendUrl = process.env.REACT_APP_BACKEND_URL;
//     // console.log("Backend URL:", backendUrl); // Debugging



//   const [isLoggedin, setIsLoggedin] = useState(false);
//   const [userData, setUserData] = useState(null); // Changed from `false` to `null`
  
// // const getAuthState =async()=>{
// //   try {
// //     const {data} = await axios.get(backendUrl+'/api/auth/is-auth');
// //     if (data.success) {
// //       setIsLoggedin(true);
// //       await  getUserData();
// //     }
// //   } catch (error) {
// //     toast.error(error.message);
// //   }
// // }



// const getAuthState = async () => {
//   try {
//     const token = localStorage.getItem("token"); // ✅ Get token from localStorage

//     if (!token) {
//       toast.error("No token found. Please log in again.");
//       return;
//     }

//     const { data } = await axios.get(backendUrl + "/api/auth/is-auth", {
//       headers: {
//         Authorization: `Bearer ${token}` // ✅ Send token in Authorization header
//       }
//     });

//     if (data.success) {
//       setIsLoggedin(true);
//       await getUserData();
//     }
//   } catch (error) {
//     toast.error(error.response?.data?.message || "Authentication failed.");
//     setIsLoggedin(false);
//     localStorage.removeItem("token"); // ✅ Clear token if authentication fails
//   }
// };

//   const getUserData = async () => {  // Fixed arrow function syntax
//     try {
//       const { data } = await axios.get(backendUrl + "/api/user/data");
//       data.success ? setUserData(data.userData) : toast.error(data.message);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };
//   // whenever the page is loaded we call this function using useEffect
//   useEffect(()=>{
//     getAuthState();
//   },[])
//   const value = {
//     backendUrl,
//     isLoggedin,
//     setIsLoggedin,
//     userData,
//     setUserData
//     ,getUserData
//   };
//   console.log(userData);
//   return (
//     <AppContent.Provider value={value}>
//       {props.children}
//     </AppContent.Provider>
//   );
// };


import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;  // ✅ Send cookies with requests

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  // ✅ Modified auth check using cookies
  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);

      if (data.success) {
        setIsLoggedin(true);
        await getUserData();
      } else {
        setIsLoggedin(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Authentication failed.");
      setIsLoggedin(false);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`);
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  console.log(userData);
  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};
