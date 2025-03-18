import React, { useContext } from "react";
import { Navbar } from "../Home/Navbar";
import { AppContent } from "../../context/AppContext";

export default function Developer() {
  const {userData} = useContext(AppContent)
  return (

    <>
    <Navbar/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Hi, {userData?userData.name:"Developer "}! 👋</h1>
      <p className="mt-4 text-lg text-gray-600">
        Welcome to the  Page. Start building something amazing!
      </p>
    </div>
    </>
    
  );
}
