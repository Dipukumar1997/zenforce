// import React, { useContext } from "react";
// import { Navbar } from "../Home/Navbar";
// import { AppContent } from "../../context/AppContext";

// export default function Developer() {
//   const {userData} = useContext(AppContent)
//   return (

//     <>
//     <Navbar/>
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-4xl font-bold text-gray-800">Hi, {userData?userData.name:"Developer "}! 👋</h1>
//       <p className="mt-4 text-lg text-gray-600">
//         Welcome to the  Page. Start building something amazing!
//       </p>
//     </div>
//     </>
    
//   );
// }


// src/components/Developer/Developer.jsx
import React, { useContext } from "react";
import { Navbar } from "../Home/Navbar";
import { AppContent } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom"; // Import Link

export default function Developer() {
  const { userData } = useContext(AppContent);
   const navigate = useNavigate();
  // Determine if the user has any access to notes (view or full)
  const hasNotesAccess = userData?.notesAccessLevel === 'view' || userData?.notesAccessLevel === 'full';
    const moveToDeveloperPage = () => {
        navigate("/developer/notes");
      }
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          Hi, {userData ? userData.name : "Developer "}! 👋
        </h1>
        <p className="mt-4 text-lg text-gray-600 text-center">
          Welcome to the Developer Page. Start building something amazing!
        </p>

        {/* Conditionally render the button based on notesAccessLevel */}
        {hasNotesAccess && (
          <Link
            to="/developer/notes"
            className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out"
          >
            Go to Your Notes
          </Link>
        )}

        {/* Optional: Message if user doesn't have access */}
        {!hasNotesAccess && userData && userData.notesAccessLevel === 'none' ||'view' && (
             <p className="mt-4 text-red-500 text-md">
               <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700" onClick={moveToDeveloperPage}>
                Go To Notes Page
              </button>
             </p>
        )}
      </div>
    </>
  );
}