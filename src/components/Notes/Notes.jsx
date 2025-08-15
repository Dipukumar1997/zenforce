// // src/components/Notes/Notes.jsx (create this file and folder)
// import React, { useContext } from "react";
// import { Navbar } from "../Home/Navbar"; // Assuming Navbar is here
// import { AppContent } from "../../context/AppContext";

// export default function Notes() {
//   const { userData } = useContext(AppContent);
//   console.log(userData);
//   // Check if the user has 'view' or 'full' access to notes
//   const canViewNotes = userData?.notesAccessLevel === 'view' || userData?.notesAccessLevel === 'full';
//   console.log("canViewNotes checking " + canViewNotes);
//   // Check if the user has 'full' access (read/write)
//   const canWriteNotes = userData?.notesAccessLevel === 'full';

//   if (!canViewNotes) {
//     // If user somehow lands here without permission, redirect or show error
//     // You might want to use useHistory or useNavigate from react-router-dom here
//     // For simplicity, we'll just show a message.
//     return (
//       <>
//         <Navbar />
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
//           <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied!</h1>
//           <p className="text-lg text-gray-700">You do not have permission to view this page.</p>
//           <p className="text-md text-gray-500 mt-2">Please upgrade your account to access premium note features.</p>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
//         <h1 className="text-4xl font-bold text-gray-800 mb-6">Your Personal Notes 📝</h1>
//         <p className="text-lg text-gray-700 mb-8">
//           Welcome to your notes page, {userData ? userData.name : "User"}!
//         </p>

//         {canWriteNotes ? (
//           <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
//             {/* This is where you'll build your "Google Keep" like interface */}
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create a New Note</h2>
//             {/* Input fields for title and content, and a submit button */}
//             <input
//               type="text"
//               placeholder="Title"
//               className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <textarea
//               placeholder="Take a note..."
//               rows="5"
//               className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             ></textarea>
//             <button className="px-5 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
//               Add Note
//             </button>

//             <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Your Notes</h2>
//             {/* Placeholder for displaying notes */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
//                 <h3 className="font-semibold text-lg mb-2">My First Note</h3>
//                 <p className="text-gray-700 text-sm">This is an example note content. You can edit or delete this.</p>
//               </div>
//               {/* More notes will go here */}
//             </div>
//           </div>
//         ) : (
//           <div className="w-full max-w-2xl bg-yellow-50 p-6 rounded-lg shadow-md border border-yellow-300 text-center">
//             <h2 className="text-2xl font-semibold text-yellow-800 mb-4">Read-Only Access</h2>
//             <p className="text-gray-700 mb-4">
//               You currently have read-only access to your notes. Upgrade to a premium plan to create, edit, and delete notes.
//             </p>
//             {/* Placeholder for displaying notes (read-only version) */}
//             <h3 className="text-xl font-semibold text-gray-700 mb-3">Your Existing Notes:</h3>
//              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
//                 <h3 className="font-semibold text-lg mb-2">My Read-Only Note</h3>
//                 <p className="text-gray-700 text-sm">This is a note you can only view.</p>
//               </div>
//               {/* More notes will go here (fetched from backend) */}
//             </div>
//             {/* A "Upgrade" button could go here */}
//              <button className="mt-6 px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700">
//                 Upgrade to Full Access
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// src/components/Notes/Notes.jsx

// import React, { useContext, useState, useEffect, useRef } from "react";
// import { Navbar } from "../Home/Navbar";
// import { AppContent } from "../../context/AppContext";
// import axios from "axios"; // Import axios
// import { useNavigate } from "react-router-dom";

// // NoteCard Component - A separate component for displaying each note
// const NoteCard = ({ note, canWrite, onEdit, onDelete }) => {

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between">
//       <div>
//         <h3 className="font-semibold text-lg mb-2 text-gray-800">{note.title}</h3>
//         <p className="text-gray-700 text-sm mb-3 whitespace-pre-wrap">{note.content}</p>
//       </div>
//       <div className="flex justify-end gap-2 text-sm text-gray-500 mt-2">
//         {note.updatedAt && (
//           <span>Updated: {new Date(note.updatedAt).toLocaleDateString()}</span>
//         )}
//         {canWrite && (
//           <div className="flex gap-2">
//             <button
//               onClick={() => onEdit(note)}
//               className="text-blue-500 hover:text-blue-700 font-medium"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => onDelete(note._id)}
//               className="text-red-500 hover:text-red-700 font-medium"
//             >
//               Delete
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default function Notes() {
//   const { userData, backendUrl } = useContext(AppContent);
//   const [notes, setNotes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [currentNote, setCurrentNote] = useState(null); // For editing: holds the note being edited
//   const [noteForm, setNoteForm] = useState({ title: "", content: "" });
//   const [isFocused, setIsFocused] = useState(false); // For the "Take a note..." input
//   const inputRef = useRef(null); // Ref for the input to expand
//    const navigate = useNavigate(); 

//   // Check access levels
//   const canViewNotes = userData?.notesAccessLevel === 'view' || userData?.notesAccessLevel === 'full';
//   const canWriteNotes = userData?.notesAccessLevel === 'full';

//   // --- API Calls ---
//   const fetchNotes = async () => {
//     if (!canViewNotes) return; // Don't fetch if no view access

//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(`${backendUrl}/api/developer/developer/developer/notes`, {
//         withCredentials: true, // Important for sending cookies/JWT
//       });
//       setNotes(response.data);
//     } catch (err) {
//       console.error("Error fetching notes:", err);
//       setError("Failed to load notes. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createNote = async () => {
//     if (!canWriteNotes) return;

//     try {
//       const response = await axios.post(`${backendUrl}/api/developer/developer/developer/notes`, noteForm, {
//         withCredentials: true,
//       });
//       setNotes([response.data, ...notes]); // Add new note to the top
//       setNoteForm({ title: "", content: "" }); // Clear form
//       setShowCreateModal(false); // Close modal
//       setIsFocused(false); // Collapse input
//     } catch (err) {
//       console.error("Error creating note:", err);
//       setError("Failed to create note. Please ensure title is not empty.");
//     }
//   };

//   const updateNote = async () => {
//     if (!canWriteNotes || !currentNote?._id) return;

//     try {
//       const response = await axios.put(`${backendUrl}/api/developer/developer/developer/notes/${currentNote._id}`, noteForm, {
//         withCredentials: true,
//       });
//       setNotes(notes.map(note => note._id === response.data._id ? response.data : note));
//       setNoteForm({ title: "", content: "" });
//       setCurrentNote(null);
//       setShowCreateModal(false);
//     } catch (err) {
//       console.error("Error updating note:", err);
//       setError("Failed to update note.");
//     }
//   };

//   const deleteNote = async (id) => {
//     if (!canWriteNotes) return;
//     if (!window.confirm("Are you sure you want to delete this note?")) return;

//     try {
//       await axios.delete(`${backendUrl}/api/developer/developer/developer/notes/${id}`, {
//         withCredentials: true,
//       });
//       setNotes(notes.filter(note => note._id !== id));
//     } catch (err) {
//       console.error("Error deleting note:", err);
//       setError("Failed to delete note.");
//     }
//   };

//   // --- Handlers ---
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNoteForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleOpenCreateModal = (note = null) => {
//     if (note) { // Editing an existing note
//       setCurrentNote(note);
//       setNoteForm({ title: note.title, content: note.content });
//     } else { // Creating a new note
//       setCurrentNote(null);
//       setNoteForm({ title: "", content: "" });
//     }
//     setShowCreateModal(true);
//   };

//   const handleCloseCreateModal = () => {
//     setShowCreateModal(false);
//     setNoteForm({ title: "", content: "" });
//     setCurrentNote(null);
//   };

//   const handleSubmitNote = (e) => {
//     e.preventDefault();
//     if (currentNote) {
//       updateNote();
//     } else {
//       createNote();
//     }
//   };

//   const handleFocus = () => {
//     if (canWriteNotes) {
//       setIsFocused(true);
//     } else {
//       alert("Upgrade your plan to create notes!"); // Or show a more elegant message
//     }
//   };

//   const handleBlur = () => {
//     // Collapse if no content and not creating/editing
//     if (!noteForm.title && !noteForm.content && !showCreateModal) {
//       setIsFocused(false);
//     }
//   };
//   const moveToDeveloperPage=()=>{
//     navigate("/developer");
//   }

//   // Fetch notes on component mount or when user data changes
//   useEffect(() => {
//     fetchNotes();
//   }, [userData]); // Refetch if user data changes (e.g., access level updates)

//   // --- Access Denied / Loading States ---
//   if (!canViewNotes) {
//     return (
//       <>
//         <Navbar />
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
//           <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied!</h1>
//           <p className="text-lg text-gray-700">You do not have permission to view this page.</p>
//           <p className="text-md text-gray-500 mt-2">Ask Developer for getting the permission</p>
//           <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700" onClick={moveToDeveloperPage }>
//             Back to Developer Page
//           </button>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
//         <h1 className="text-4xl font-bold text-gray-800 my-6">Your Personal Notes 📝</h1>

//         {/* Search Bar (Optional, but common for notes apps) */}
//         <div className="w-full max-w-2xl mb-8">
//           <input
//             type="text"
//             placeholder="Search your notes..."
//             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* "Take a note..." Input Area (Google Keep style) */}
//         {canWriteNotes && (
//           <div
//             className={`w-full max-w-xl mb-8 p-4 bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out ${
//               isFocused ? "h-auto" : "h-12 overflow-hidden"
//             }`}
//             onClick={() => handleFocus()}
//             onBlur={handleBlur}
//             tabIndex="0" // Make div focusable
//           >
//             {isFocused && (
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Title"
//                 value={noteForm.title}
//                 onChange={handleInputChange}
//                 className="w-full text-lg font-medium outline-none border-b border-gray-200 focus:border-blue-500 pb-2 mb-3"
//                 autoFocus // Automatically focus when expanded
//               />
//             )}
//             <textarea
//               name="content"
//               placeholder="Take a note..."
//               value={noteForm.content}
//               onChange={handleInputChange}
//               rows={isFocused ? 5 : 1}
//               className={`w-full resize-none outline-none text-gray-700 ${isFocused ? 'pt-2' : ''}`}
//               onFocus={handleFocus}
//               // onBlur={handleBlur} // Handled by parent div for better control
//             ></textarea>
//             {isFocused && (
//               <div className="flex justify-end mt-3">
//                 <button
//                   onClick={() => handleOpenCreateModal()} // Open modal for full creation
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   Create Note
//                 </button>
//                  <button
//                   onClick={() => {
//                     if (inputRef.current) inputRef.current.blur(); // Force blur to collapse
//                     setIsFocused(false);
//                     setNoteForm({ title: "", content: "" }); // Clear form
//                   }}
//                   className="ml-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
//                 >
//                   Close
//                 </button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Display Notes Section */}
//         <h2 className="text-3xl font-semibold text-gray-800 mb-6 mt-8">Your Notes</h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         {loading ? (
//           <p className="text-gray-600">Loading notes...</p>
//         ) : notes.length === 0 ? (
//           <p className="text-gray-600">No notes yet. Start by creating one!</p>
//         ) : (
//           <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {notes.map((note) => (
//               <NoteCard
//                 key={note._id}
//                 note={note}
//                 canWrite={canWriteNotes}
//                 onEdit={handleOpenCreateModal}
//                 onDelete={deleteNote}
//               />
//             ))}
//           </div>
//         )}

//         {/* Create/Edit Note Modal */}
//         {showCreateModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative">
//               <button
//                 onClick={handleCloseCreateModal}
//                 className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
//               >
//                 &times;
//               </button>
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                 {currentNote ? "Edit Note" : "Create New Note"}
//               </h2>
//               <form onSubmit={handleSubmitNote}>
//                 <input
//                   type="text"
//                   name="title"
//                   placeholder="Title"
//                   value={noteForm.title}
//                   onChange={handleInputChange}
//                   className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//                 <textarea
//                   name="content"
//                   placeholder="Take a note..."
//                   rows="7"
//                   value={noteForm.content}
//                   onChange={handleInputChange}
//                   className="w-full p-3 mb-4 border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 ></textarea>
//                 <div className="flex justify-end gap-3">
//                   <button
//                     type="button"
//                     onClick={handleCloseCreateModal}
//                     className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-5 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
//                   >
//                     {currentNote ? "Update Note" : "Save Note"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }














// // src/components/Notes/Notes.jsx
// import React, { useContext, useState, useEffect } from "react";
// import { Navbar } from "../Home/Navbar"; // Assuming Navbar is here
// import { AppContent } from "../../context/AppContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // Don't forget to import this

// // NoteCard Component - A separate component for displaying each note
// const NoteCard = ({ note, canWrite, onEdit, onDelete }) => {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between">
//       <div>
//         <h3 className="font-semibold text-lg mb-2 text-gray-800">{note.title}</h3>
//         <p className="text-gray-700 text-sm mb-3 whitespace-pre-wrap">{note.content}</p>
//       </div>
//       <div className="flex justify-end gap-2 text-sm text-gray-500 mt-2">
//         {note.updatedAt && (
//           <span>Updated: {new Date(note.updatedAt).toLocaleDateString()}</span>
//         )}
//         {canWrite && (
//           <div className="flex gap-2">
//             <button
//               onClick={() => onEdit(note)}
//               className="text-blue-500 hover:text-blue-700 font-medium"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => onDelete(note._id)}
//               className="text-red-500 hover:text-red-700 font-medium"
//             >
//               Delete
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default function Notes() {
//   const { userData, backendUrl } = useContext(AppContent);
//   const [notes, setNotes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [currentNote, setCurrentNote] = useState(null); // For editing: holds the note being edited
//   const [noteForm, setNoteForm] = useState({ title: "", content: "" });
//   const [searchQuery, setSearchQuery] = useState(""); // For search functionality
//   const navigate = useNavigate();

//   // Check access levels
//   const canViewNotes = userData?.notesAccessLevel === 'view' || userData?.notesAccessLevel === 'full';
//   const canWriteNotes = userData?.notesAccessLevel === 'full';

//   // --- API Calls ---
//   const fetchNotes = async () => {
//     if (!canViewNotes) return;

//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(`${backendUrl}/api/developer/developer/notes`, {
//         withCredentials: true,
//       });
//       setNotes(response.data);
//     } catch (err) {
//       console.error("Error fetching notes:", err);
//       setError("Failed to load notes. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createNote = async () => {
//     if (!canWriteNotes) return;

//     try {
//       const response = await axios.post(`${backendUrl}/api/developer/developer/notes`, noteForm, {
//         withCredentials: true,
//       });
//       setNotes([response.data, ...notes]); // Add new note to the top
//       handleCloseCreateModal(); // Close modal and reset form
//     } catch (err) {
//       console.error("Error creating note:", err);
//       setError("Failed to create note. Please ensure title is not empty.");
//     }
//   };

//   const updateNote = async () => {
//     if (!canWriteNotes || !currentNote?._id) return;

//     try {
//       const response = await axios.put(`${backendUrl}/api/developer/developer/notes/${currentNote._id}`, noteForm, {
//         withCredentials: true,
//       });
//       setNotes(notes.map(note => note._id === response.data._id ? response.data : note));
//       handleCloseCreateModal(); // Close modal and reset form
//     } catch (err) {
//       console.error("Error updating note:", err);
//       setError("Failed to update note.");
//     }
//   };

//   const deleteNote = async (id) => {
//     if (!canWriteNotes) return;
//     if (!window.confirm("Are you sure you want to delete this note?")) return;

//     try {
//       await axios.delete(`${backendUrl}/api/developer/developer/notes/${id}`, {
//         withCredentials: true,
//       });
//       setNotes(notes.filter(note => note._id !== id));
//     } catch (err) {
//       console.error("Error deleting note:", err);
//       setError("Failed to delete note.");
//     }
//   };

//   // --- Handlers ---
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNoteForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleOpenCreateModal = (note = null) => {
//     if (note) { // Editing an existing note
//       setCurrentNote(note);
//       setNoteForm({ title: note.title, content: note.content });
//     } else { // Creating a new note
//       setCurrentNote(null);
//       setNoteForm({ title: "", content: "" }); // Clear form for new note
//     }
//     setShowCreateModal(true);
//   };

//   const handleCloseCreateModal = () => {
//     setShowCreateModal(false);
//     setNoteForm({ title: "", content: "" }); // Always reset form on close
//     setCurrentNote(null); // Clear current note on close
//   };

//   const handleSubmitNote = (e) => {
//     e.preventDefault();
//     if (currentNote) {
//       updateNote();
//     } else {
//       createNote();
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const moveToDeveloperPage = () => {
//     navigate("/developer");
//   }

//   // Filter notes based on search query
//   const filteredNotes = notes.filter(note =>
//     note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     note.content.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Fetch notes on component mount or when user data changes
//   useEffect(() => {
//     fetchNotes();
//   }, [userData]); // Added userData as dependency to refetch if it changes

//   // --- Access Denied / Loading States ---
//   if (!canViewNotes) {
//     return (
//       <>
//         <Navbar />
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
//           <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied!</h1>
//           <p className="text-lg text-gray-700">You do not have permission to view this page.</p>
//           <p className="text-md text-gray-500 mt-2">Ask Developer for getting the permission.</p>
//           <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700" onClick={moveToDeveloperPage}>
//             Back to Developer Page
//           </button>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">

//         {/* Top Bar: Search and Add Note Button */}
//         <div className="w-full max-w-4xl flex items-center justify-between mb-8 p-3 bg-white rounded-lg shadow-md">
//           <input
//             type="text"
//             placeholder="Search your notes..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
//           />
//           {canWriteNotes && (
//             <button
//               onClick={() => handleOpenCreateModal()}
//               className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
//               </svg>
//               <span>Add Note</span>
//             </button>
//           )}
//         </div>

//         {/* Display Notes Section */}
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         {loading ? (
//           <p className="text-gray-600 mt-8">Loading notes...</p>
//         ) : filteredNotes.length === 0 ? (
//           <p className="text-gray-600 mt-8">
//             {searchQuery ? "No matching notes found." : "No notes yet. Click 'Add Note' to create your first one!"}
//           </p>
//         ) : (
//           <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {filteredNotes.map((note) => (
//               <NoteCard
//                 key={note._id}
//                 note={note}
//                 canWrite={canWriteNotes}
//                 onEdit={handleOpenCreateModal}
//                 onDelete={deleteNote}
//               />
//             ))}
//           </div>
//         )}

//         {/* Create/Edit Note Modal */}
//         {showCreateModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative">
//               <button
//                 onClick={handleCloseCreateModal}
//                 className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
//               >
//                 &times;
//               </button>
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                 {currentNote ? "Edit Note" : "Create New Note"}
//               </h2>
//               <form onSubmit={handleSubmitNote}>
//                 <input
//                   type="text"
//                   name="title"
//                   placeholder="Title"
//                   value={noteForm.title}
//                   onChange={handleInputChange}
//                   className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//                 <textarea
//                   name="content"
//                   placeholder="Take a note..."
//                   rows="7"
//                   value={noteForm.content}
//                   onChange={handleInputChange}
//                   className="w-full p-3 mb-4 border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 ></textarea>
//                 <div className="flex justify-end gap-3">
//                   <button
//                     type="button"
//                     onClick={handleCloseCreateModal}
//                     className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-5 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
//                   >
//                     {currentNote ? "Update Note" : "Save Note"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }


// src/components/Notes/Notes.jsx
import React, { useContext, useState, useEffect } from "react";
import { Navbar } from "../Home/Navbar";
import { AppContent } from "../../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// NoteCard Component (as updated above)
const NoteCard = ({ note, canWrite, onEdit, onDelete, onOpenView }) => {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between cursor-pointer"
      onClick={() => onOpenView(note)} // Click to open full view
    >
      <div>
        <h3 className="font-semibold text-lg mb-2 text-gray-800">{note.title}</h3>
        {/* Fixed height for content with overflow hidden */}
        <p className="text-gray-700 text-sm mb-3 whitespace-pre-wrap max-h-24 overflow-hidden">
          {note.content}
        </p>
      </div>
      <div className="flex justify-end gap-2 text-sm text-gray-500 mt-2">
        {note.updatedAt && (
          <span>Updated: {new Date(note.updatedAt).toLocaleDateString()}</span>
        )}
        {canWrite && (
          <div className="flex gap-2">
            {/* Edit button directly opens the modal in edit mode */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent the card's onClick from firing
                onEdit(note);
              }}
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent the card's onClick from firing
                onDelete(note._id);
              }}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


export default function Notes() {
  const { userData, backendUrl } = useContext(AppContent);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNoteModal, setShowNoteModal] = useState(false); // Renamed from showCreateModal
  const [currentNote, setCurrentNote] = useState(null); // The note being viewed/edited
  const [noteForm, setNoteForm] = useState({ title: "", content: "" }); // Form state for editing
  const [isEditing, setIsEditing] = useState(false); // New state to determine modal mode
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null); // Holds the ID of the note being deleted
  const token = localStorage.getItem('token');

  // Check access levels
  const canViewNotes = userData?.notesAccessLevel === 'view' || userData?.notesAccessLevel === 'full';
  const canWriteNotes = userData?.notesAccessLevel === 'full';

  // --- API Calls ---
  const fetchNotes = async () => {
    if (!canViewNotes) return;

    setLoading(true);
    setError(null);
    try {
      // const response = await axios.get(`${backendUrl}/api/developer/notes`, {
      //   withCredentials: true,
      // });
      const response = await axios.get(`${backendUrl}/api/developer/notes`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      setNotes(response.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Failed to load notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const createNote = async () => {
    if (!canWriteNotes) return;
    if (!noteForm.title.trim()) { // Basic validation
      setError("Title cannot be empty.");
      return;
    }
    setIsCreating(true); // Start loading for creation
    try {
      const response = await axios.post(`${backendUrl}/api/developer/notes`, noteForm, {
        withCredentials: true,
      });
      setNotes([response.data, ...notes]); // Add new note to the top
      handleCloseNoteModal(); // Close modal and reset form
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error creating note:", err);
      setError("Failed to create note. Please ensure title is not empty.");
    } finally {
      setIsCreating(false); // End loading for creation
    }
  };

  const updateNote = async () => {
    if (!canWriteNotes || !currentNote?._id) return;
    if (!noteForm.title.trim()) { // Basic validation
      setError("Title cannot be empty.");
      return;
    }
    setIsUpdating(true); // Start loading for update
    try {
      const response = await axios.put(`${backendUrl}/api/developer/notes/${currentNote._id}`, noteForm, {
        withCredentials: true,
      });
      setNotes(notes.map(note => note._id === response.data._id ? response.data : note));
      handleCloseNoteModal(); // Close modal and reset form
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error updating note:", err);
      setError("Failed to update note.");
    } finally {
      setIsUpdating(false); // End loading for update
    }
  };

  const deleteNote = async (id) => {
    if (!canWriteNotes) return;
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    setIsDeleting(id); // Set the ID of the note being deleted to show spinner on its button

    try {
      await axios.delete(`${backendUrl}/api/developer/notes/${id}`, {
        withCredentials: true,
      });
      setNotes(notes.filter(note => note._id !== id));
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error deleting note:", err);
      setError("Failed to delete note.");
    } finally {
      setIsDeleting(null); // End loading for deletion
    }
  };

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNoteForm(prev => ({ ...prev, [name]: value }));
  };

  // This handler now handles opening the modal for BOTH viewing and editing
  const handleOpenNoteModal = (note = null, editMode = false) => {
    if (note) { // Viewing or Editing an existing note
      setCurrentNote(note);
      setNoteForm({ title: note.title, content: note.content });
      setIsEditing(editMode);
    } else { // Creating a new note
      setCurrentNote(null);
      setNoteForm({ title: "", content: "" }); // Clear form for new note
      setIsEditing(true); // Always start in edit mode for new notes
    }
    setShowNoteModal(true);
    setError(null); // Clear errors when opening modal
  };

  const handleCloseNoteModal = () => {
    setShowNoteModal(false);
    setNoteForm({ title: "", content: "" }); // Always reset form on close
    setCurrentNote(null); // Clear current note on close
    setIsEditing(false); // Reset edit mode
    setError(null); // Clear errors
  };

  const handleSubmitNote = (e) => {
    e.preventDefault();
    if (currentNote) {
      updateNote();
    } else {
      createNote();
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const moveToDeveloperPage = () => {
    navigate("/developer");
  }

  // Filter notes based on search query
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetch notes on component mount or when user data changes
  useEffect(() => {
    fetchNotes();
  }, [userData]);

  // --- NEW: useEffect for Escape Key Listener ---
  useEffect(() => {
    const handleEscapeKey = (event) => {
      // Check if the Escape key was pressed and the modal is currently open
      if (event.key === 'Escape' && showNoteModal) {
        handleCloseNoteModal();
      }
    };
    // Add the event listener when the component mounts
    document.addEventListener('keydown', handleEscapeKey);
    // Clean up the event listener when the component unmounts or modal state changes
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showNoteModal, handleCloseNoteModal]); // Re-run effect if modal state or handler changes

  // --- Access Denied / Loading States ---
  if (!canViewNotes) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied!</h1>
          <p className="text-lg text-gray-700">You do not have permission to view this page.</p>
          <p className="text-md text-gray-500 mt-2">Please ask the Developer for permission.</p>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700" onClick={moveToDeveloperPage}>
            Back to Developer Page
          </button>
        </div>
      </>
    );
  }

  // return (
  //   <>
  //     <Navbar />
  //     <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">

  //       {/* Top Bar: Search and Add Note Button */}
  //       <div className="w-full max-w-4xl flex items-center justify-between mb-8 p-3 bg-white rounded-lg shadow-md">
  //         <input
  //           type="text"
  //           placeholder="Search your notes..."
  //           value={searchQuery}
  //           onChange={handleSearchChange}
  //           className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
  //         />
  //         {canWriteNotes && (
  //           <button
  //             onClick={() => handleOpenNoteModal(null, true)} // Open in create mode
  //             className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2"
  //           >
  //             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  //               <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
  //             </svg>
  //             <span>Add Note</span>
  //           </button>
  //         )}
  //       </div>

  //       {/* Display Notes Section */}
  //       {error && <p className="text-red-500 mb-4">{error}</p>}
  //       {loading ? (
  //         <p className="text-gray-600 mt-8">Loading notes...</p>
  //       ) : filteredNotes.length === 0 ? (
  //         <p className="text-gray-600 mt-8">
  //           {searchQuery ? "No matching notes found." : "No notes yet. Click 'Add Note' to create your first one!"}
  //         </p>
  //       ) : (
  //         <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  //           {filteredNotes.map((note) => (
  //             <NoteCard
  //               key={note._id}
  //               note={note}
  //               canWrite={canWriteNotes}
  //               onEdit={(n) => handleOpenNoteModal(n, true)} // Pass note and true for edit mode
  //               onDelete={deleteNote}
  //               onOpenView={(n) => handleOpenNoteModal(n, false)} // Pass note and false for view mode
  //             />
  //           ))}
  //         </div>
  //       )}

  //       {/* Note View/Edit Modal */}
  //       {showNoteModal && (
  //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
  //           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative">
  //             <button
  //               onClick={handleCloseNoteModal}
  //               className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
  //             >
  //               &times;
  //             </button>
  //             <h2 className="text-2xl font-semibold text-gray-800 mb-4">
  //               {isEditing ? (currentNote ? "Edit Note" : "Create New Note") : "View Note"}
  //             </h2>
  //             {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display modal-specific errors */}
  //             {isEditing ? (
  //               <form onSubmit={handleSubmitNote}>
  //                 <input
  //                   type="text"
  //                   name="title"
  //                   placeholder="Title"
  //                   value={noteForm.title}
  //                   onChange={handleInputChange}
  //                   className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //                   required
  //                 />
  //                 <textarea
  //                   name="content"
  //                   placeholder="Take a note..."
  //                   rows="7"
  //                   value={noteForm.content}
  //                   onChange={handleInputChange}
  //                   className="w-full p-3 mb-4 border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
  //                 ></textarea>
  //                 <div className="flex justify-end gap-3">
  //                   <button
  //                     type="button"
  //                     onClick={handleCloseNoteModal}
  //                     className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
  //                   >
  //                     Cancel
  //                   </button>
  //                   <button
  //                     type="submit"
  //                     className="px-5 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
  //                   >
  //                     {currentNote ? "Update Note" : "Save Note"}
  //                   </button>
  //                 </div>
  //               </form>
  //             ) : (
  //               // View Mode
  //               <div className="max-h-[70vh] overflow-y-auto"> {/* Scrollable content */}
  //                 <h3 className="font-semibold text-xl mb-2 text-gray-900">{currentNote?.title}</h3>
  //                 <p className="text-gray-700 whitespace-pre-wrap">{currentNote?.content}</p>
  //                 {canWriteNotes && ( // Only show edit button if user has write access
  //                   <div className="flex justify-end mt-4">
  //                     <button
  //                       onClick={() => handleOpenNoteModal(currentNote, true)} // Switch to edit mode
  //                       className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
  //                     >
  //                       Edit Note
  //                     </button>
  //                   </div>
  //                 )}
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   </>
  // );

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">

        {/* Top Bar: Search and Add Note Button */}
        <div className="w-full max-w-4xl flex items-center justify-between mb-8 p-3 bg-white rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Search your notes..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
          />
          {canWriteNotes && (
            <button
              onClick={() => handleOpenNoteModal(null, true)}
              className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2"
              disabled={isCreating} // Disable during creation
            >
              {isCreating ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  <span>Add Note</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Display Notes Section */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading ? ( // Initial fetch loading spinner
          <div className="flex justify-center items-center mt-8">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
            <p className="ml-3 text-gray-600">Loading notes...</p>
          </div>
        ) : filteredNotes.length === 0 ? (
          <p className="text-gray-600 mt-8">
            {searchQuery ? "No matching notes found." : "No notes yet. Click 'Add Note' to create your first one!"}
          </p>
        ) : (
          <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                canWrite={canWriteNotes}
                onEdit={(n) => handleOpenNoteModal(n, true)}
                onDelete={deleteNote}
                onOpenView={(n) => handleOpenNoteModal(n, false)}
              />
            ))}
          </div>
        )}

        {/* Note View/Edit Modal */}
        {showNoteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative">
              <button
                onClick={handleCloseNoteModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              >
                &times;
              </button>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {isEditing ? (currentNote ? "Edit Note" : "Create New Note") : "View Note"}
              </h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {isEditing ? (
                <form onSubmit={handleSubmitNote}>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={noteForm.title}
                    onChange={handleInputChange}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <textarea
                    name="content"
                    placeholder="Take a note..."
                    rows="7"
                    value={noteForm.content}
                    onChange={handleInputChange}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleCloseNoteModal}
                      className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                      disabled={isCreating || isUpdating} // Disable cancel button if another action is loading
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                      disabled={isCreating || isUpdating} // Disable during create/update
                    >
                      {isCreating || isUpdating ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
                      ) : (
                        currentNote ? "Update Note" : "Save Note"
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="max-h-[70vh] overflow-y-auto">
                  <h3 className="font-semibold text-xl mb-2 text-gray-900">{currentNote?.title}</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{currentNote?.content}</p>
                  {canWriteNotes && (
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => handleOpenNoteModal(currentNote, true)}
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                      >
                        Edit Note
                      </button>
                      {/* Delete button within view mode */}
                      <button
                        onClick={() => deleteNote(currentNote._id)}
                        className="ml-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                        disabled={isDeleting === currentNote._id} // Disable if this specific note is being deleted
                      >
                        {isDeleting === currentNote._id ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
                        ) : "Delete Note"}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}