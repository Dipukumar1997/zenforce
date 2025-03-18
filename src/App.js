// import { useState } from 'react';
// import './App.css';

// function App() {
//   const [vvalue, setValue] = useState('');

//   const handleDelete = () => {
//     setValue((prevValue) => prevValue.slice(0, -1));
//   };

//   const handleEvaluate = () => {
//     try {
//       setValue(eval(vvalue).toString());
//     } catch (error) {
//       setValue("Error"); // Handle invalid expressions
//     }
//   };

//   return (
//     <div className="container">
//       <div className="calculator">
//         <form>
//           <div>
//             <input type="text" value={vvalue} readOnly />
//           </div>
//           <div>
//             <input type="button" value="AC" onClick={() => setValue('')} />
//             <input type="button" value="DE" onClick={handleDelete} />
//             <input type="button" value="." onClick={e => setValue(vvalue + e.target.value)} />
//             <input type="button" value="/" onClick={e => setValue(vvalue + e.target.value)} />
//           </div>
//           <div>
//             <input type="button" value="7" onClick={e => setValue(vvalue + e.target.value)} />
//             <input type="button" value="8" onClick={e => setValue(vvalue + e.target.value)} />
//             <input type="button" value="9" onClick={e => setValue(vvalue + e.target.value)} />
//             <input type="button" value="*" onClick={e => setValue(vvalue + e.target.value)} />
//           </div>
//           <div>
//             <input type="button" value="4" onClick={e => setValue(vvalue + e.target.value)} />
//             <input type="button" value="5" onClick={e => setValue(vvalue + e.target.value)} />
//             <input type="button" value="6" onClick={e => setValue(vvalue + e.target.value)} />
//             <input type="button" value="+" onClick={e => setValue(vvalue + e.target.value)} />
//           </div>
//           <div>
//             <input type="button" value="1" onClick={e => setValue(vvalue + e.target.value)} />
//             <input type="button" value="2" onClick={e => setValue(vvalue + e.target.value)} />
//             <input type="button" value="3" onClick={e => setValue(vvalue + e.target.value)} />
//             <input type="button" value="-" onClick={e => setValue(vvalue + e.target.value)} />
//           </div>
//           <div>
//             <input type="button" value="00" onClick={e => setValue(vvalue + e.target.value)} />
//             <input type="button" value="0" onClick={e => setValue(vvalue + e.target.value)} />
//             <input type="button" className="equal" value="=" onClick={handleEvaluate} />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default App;
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Calculator from "./components/Calculaotor/Calculator"; // Ensure correct path
import { assets } from "../src/assests/assets";
import "./index.css";
import { Home } from "./components/Home/Home"; 
import Login   from "../src/components/Login/Login.jsx";
import ResetPassword from "../src/components/Login/ResetPassword.jsx";
import Developer from "./components/Developer/Developer.jsx";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import EmailVerify from "./components/Login/EmailVerify.jsx";

// import ResetPassword from "./components/Login/ResetPassword.js";



function Homee() {
  const navigate = useNavigate();
  return (
    <> 
    {/* <ToastContainer/> */}
    {/* Wrapped everything inside a div */}
     <button className="bg-yellow-100" >Hello</button>
      <Home />
      <div className="flex gap-2">
        <button onClick={() => navigate("/cal")} className="bg-blue-500 text-white font-semibold px-3 py-1 rounded-lg shadow-sm hover:bg-blue-600 transition">
          Open Calculator
        </button>
        {/* <button onClick={() => navigate("/login")} className="flex space-x-2 bg-green-500 text-white font-semibold px-3 py-1 rounded-lg shadow-md hover:bg-green-600 transition" >
          <span>Login / Register</span>
          <img src={assets.arrow_icon} className="w-6 h-6" />
        </button> */}
         <button onClick={() => navigate("/login")} className="flex space-x-2 bg-green-500 text-white font-semibold px-3 py-1 rounded-lg shadow-md hover:bg-green-600 transition" >
          <span>Login / Register</span>
          <img src={assets.arrow_icon} className="w-6 h-6" />
        </button>

      </div>
    </> 
  );
}

function App() {
  return (
    <>
     <ToastContainer/>
      <Routes>
        <Route path="/" element={<Homee />} />
        <Route path="/cal" element={<Calculator />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/developer" element={<Developer/>} />
        <Route  path="/email-verify" element={<EmailVerify/>}                           />
      </Routes>
      {/* </ToastContainer> */}
    {/* // </Router> */}
  {/* //   <div className="bg-blue-500 text-white p-10 text-2xl">
  //   Tailwind is working! 🎉
  // </div> */}
    </>
   
  );
}

export default App;
