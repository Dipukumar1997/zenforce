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
  
// const getAuthState =async()=>{
//   try {
//     const {data} = await axios.get(backendUrl+'/api/auth/is-auth');
//     if (data.success) {
//       setIsLoggedin(true);
//       getUserData();
//     }
//   } catch (error) {
//     toast.error("error.message");
//   }
// }
//   const getUserData = async () => {  // Fixed arrow function syntax
//     try {
//       const { data } = await axios.get(backendUrl + "/api/user/data");
//       data.success ? setUserData(data.userData) : toast.error(data.message);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };
//   //whenever the page is loaded we call this function using useEffect
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
  axios.defaults.withCredentials = true;
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  console.log(backendUrl);

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/is-auth`);
      console.log(data);
      if (data.success) {
        const userResponse = await getUserData();  // ✅ Wait for `getUserData()`
        // console.log(first)
        if (userResponse) {
          setIsLoggedin(true);   // ✅ Only log in if user data is valid
        } else {
          setIsLoggedin(false);  // ✅ Prevent login if no user data
        }
      } else {
        setIsLoggedin(false);
      }
    } catch (error) {
      console.error("Auth check failed:", error.message);
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl+"/api/user/data");

      if (data.success) {
        setUserData(data.userData);
        return true;   // ✅ Return `true` if user data is valid
      } else {
        toast.error(data.message);
        setUserData(null);
        return false;  // ✅ Return `false` if no valid user data
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error.message);
      toast.error(error.message);
      setUserData(null);
      return false;
    }
  };

  // useEffect(() => {
  //   getAuthState();
  // }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData
  };

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};
