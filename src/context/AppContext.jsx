import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios"
export const AppContent = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials =true;
  // Corrected environment variable usage
  //   const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    // console.log("Backend URL:", backendUrl); // Debugging



  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null); // Changed from `false` to `null`
  


  // const setAuthHeader = () => {
  //   const token = localStorage.getItem("token");
  //   // if (token) {
  //   //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //   // } else {
  //   //   delete axios.defaults.headers.common["Authorization"];
  //   // }
  // };
  
  // const getAuthState = async () => {
  //   const token = localStorage.getItem("token");
  //   try {
  //     const { data } = await axios.get(backendUrl + '/api/auth/is-auth');
  //     if (data.success) {
  //       setIsLoggedin(true);
  //       getUserData();
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       // Do nothing or handle silently
  //       setIsLoggedin(false);
  //     } else {
  //       toast.error(error.message);  // Show toast only for other errors
  //     }
  //   }
  // };
  
  const getAuthState = async () => {
    const token = localStorage.getItem("token");
    console.log("your token is " , token);
    // setAuthHeader();  // ✅ Set token before making the request
  
    try {
      const { data } = await axios.get(backendUrl + '/api/auth/is-auth',{token});
       console.log("printing the data in try block "+ data);
      if (data.success) {
        console.log("dat.sucees is true ")
        setIsLoggedin(true);
        getUserData();
        console.log("printing the getUserdata"+getUserData());
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setIsLoggedin(false);
      } else {
        console.log("error in get Authstates ")
        toast.error(error.message);
      }
    }
  };
  // const getUserData = async () => {  // Fixed arrow function syntax
  //   try {
  //     const { data } = await axios.get(backendUrl + "/api/user/data");
  //     data.success ? setUserData(data.userData) : toast.error(data.message);
  //   } catch (error) {
  //     console.error("Error details in app context  in getAuthState:", error);
  //     toast.error(error.message);
  //   }
  // };


  const getUserData = async () => {
    // setAuthHeader();  // ✅ Set token before making the request
  
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");
      console.log("printg the data from getUserdata " , data  )
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      console.error("Error details:", error);
      toast.error(error.message);
    }
  };

  // whenever the page is loaded we call this function using useEffect
  useEffect(()=>{
    // setAuthHeader();    // ✅ Attach token on page load
  getAuthState();
    // getAuthState();
  },[])
  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData
    ,getUserData
  };
  console.log(userData);
  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};









// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";

// export const AppContent = createContext();

// export const AppContextProvider = (props) => {
//   axios.defaults.withCredentials = true;

//   const backendUrl = process.env.REACT_APP_BACKEND_URL;

//   const [isLoggedin, setIsLoggedin] = useState(false);
//   const [userData, setUserData] = useState(null);

//   // ✅ Check for token in localStorage
//   const getToken = () => {
//     return localStorage.getItem("token");
//   };

//   // ✅ Set Authorization header with localStorage token
//   const setAuthHeader = () => {
//     const token = getToken();
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     } else {
//       delete axios.defaults.headers.common["Authorization"];
//     }
//   };

//   const getAuthState = async () => {
//     setAuthHeader(); // Apply token from localStorage

//     try {
//       const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
//       if (data.success) {
//         setIsLoggedin(true);
//         getUserData();
//       }
//     } catch (error) {
//       console.error("Error details in app context  in getAuthState:", error);
//       if (error.response && error.response.status === 401) {
//         setIsLoggedin(false);
//       } else {
//         toast.error(error.message);
//       }
//     }
//   };

//   const getUserData = async () => {
//     try {
//       const { data } = await axios.get(backendUrl + "/api/user/data");
//       data.success ? setUserData(data.userData) : toast.error(data.message);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // ✅ Automatically add token on page load
//   useEffect(() => {
//     getAuthState();
//   }, []);

//   const value = {
//     backendUrl,
//     isLoggedin,
//     setIsLoggedin,
//     userData,
//     setUserData,
//     getUserData,
//   };

//   console.log(userData);

//   return (
//     <AppContent.Provider value={value}>
//       {props.children}
//     </AppContent.Provider>
//   );
// };























































































// import { createContext, useEffect, useState, useCallback } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";

// export const AppContent = createContext();

// export const AppContextProvider = (props) => {
//   axios.defaults.withCredentials = true;

//   const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

//   const [isLoggedin, setIsLoggedin] = useState(false);
//   const [userData, setUserData] = useState(null);

//   const getAuthState = useCallback(async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
//       if (data.success) {
//         setIsLoggedin(true);
//         getUserData();
//       } else {
//         setIsLoggedin(false);
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         setIsLoggedin(false);  // Silent fail
//       } else {
//         toast.error(error.response?.data?.message || "Authentication failed");
//       }
//     }
//   }, [backendUrl]);

//   const getUserData = useCallback(async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/user/data`);
//       data.success ? setUserData(data.userData) : toast.error(data.message);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to fetch user data");
//     }
//   }, [backendUrl]);

//   useEffect(() => {
//     getAuthState();
//   }, [getAuthState]);

//   const value = {
//     backendUrl,
//     isLoggedin,
//     setIsLoggedin,
//     userData,
//     setUserData,
//     getUserData
//   };

//   return (
//     <AppContent.Provider value={value}>
//       {props.children}
//     </AppContent.Provider>
//   );
// };


// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";

// export const AppContent = createContext();

// export const AppContextProvider = (props) => {
//   axios.defaults.withCredentials = true;

//   const backendUrl = process.env.REACT_APP_BACKEND_URL;

//   const [isLoggedin, setIsLoggedin] = useState(false);
//   const [userData, setUserData] = useState(null);

//   // ✅ Function to get the token from the cookie
//   const getCookie = (name) => {
//     const cookies = document.cookie.split('; ');
//     const cookie = cookies.find((c) => c.startsWith(`${name}=`));
//     return cookie ? cookie.split('=')[1] : null;
//   };

//   // ✅ Function to validate the token from the cookie
//   const isTokenValid = () => {
//     const token = getCookie('token');  // Get token from cookie
//     if (!token) return false;

//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));  // Decode JWT token
//       const isExpired = payload.exp * 1000 < Date.now();      // Check expiry time
//       return !isExpired;
//     } catch (error) {
//       return false;  // Invalid token format
//     }
//   };

//   // ✅ Modified `getAuthState` function with cookie validation
//   const getAuthState = async () => {
//     if (!isTokenValid()) {     // Skip API call if token is invalid or expired
//       setIsLoggedin(false);
//       return;
//     }

//     try {
//       const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
//       if (data.success) {
//         setIsLoggedin(true);
//         getUserData();
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         setIsLoggedin(false);
//       } else {
//         toast.error(error.message);
//       }
//     }
//   };

//   // ✅ Fetch user data
//   const getUserData = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/user/data`);
//       data.success ? setUserData(data.userData) : toast.error(data.message);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // ✅ Fetch auth state on load
//   useEffect(() => {
//     getAuthState();
//   }, []);

//   const value = {
//     backendUrl,
//     isLoggedin,
//     setIsLoggedin,
//     userData,
//     setUserData,
//     getUserData
//   };

//   console.log(userData);

//   return (
//     <AppContent.Provider value={value}>
//       {props.children}
//     </AppContent.Provider>
//   );
// };
