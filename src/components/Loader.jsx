// import React from "react";

// const Loader = () => {
//   const loaderStyle = {
//     "--d": "22px",
//     width: "4px",
//     height: "4px",
//     borderRadius: "50%",
//     color: "#25b09b",
//     boxShadow: `
//       calc(1*var(--d))      calc(0*var(--d))     0 0,
//       calc(0.707*var(--d))  calc(0.707*var(--d)) 0 1px,
//       calc(0*var(--d))      calc(1*var(--d))     0 2px,
//       calc(-0.707*var(--d)) calc(0.707*var(--d)) 0 3px,
//       calc(-1*var(--d))     calc(0*var(--d))     0 4px,
//       calc(-0.707*var(--d)) calc(-0.707*var(--d))0 5px,
//       calc(0*var(--d))      calc(-1*var(--d))    0 6px
//     `,
//     animation: "l27 1s infinite steps(8)",
//   };

//   const keyframes = `
//     @keyframes l27 {
//       100% { transform: rotate(1turn); }
//     }
//   `;

//   return (
//     <>
//       <style>{keyframes}</style>
//       <div style={loaderStyle}></div>
//     </>
//   );
// };

// export default Loader;
import React from "react";

const ButtonWithLoader = ({ state, loading }) => {
  const loaderStyle = {
    "--d": "10px",
    width: "4px",
    height: "4px",
    borderRadius: "50%",
    color: "#fff",
    boxShadow: `
      calc(1*var(--d))      calc(0*var(--d))     0 0,
      calc(0.707*var(--d))  calc(0.707*var(--d)) 0 1px,
      calc(0*var(--d))      calc(1*var(--d))     0 2px,
      calc(-0.707*var(--d)) calc(0.707*var(--d)) 0 3px,
      calc(-1*var(--d))     calc(0*var(--d))     0 4px,
      calc(-0.707*var(--d)) calc(-0.707*var(--d))0 5px,
      calc(0*var(--d))      calc(-1*var(--d))    0 6px
    `,
    animation: "l27 1s infinite steps(8)",
  };

  const keyframes = `
    @keyframes l27 {
      100% { transform: rotate(1turn); }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <button
        className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium flex justify-center items-center gap-2"
        disabled={loading}  // Disable button when loading
      >
        {loading ? (
          <>
            <div style={loaderStyle}></div>
            <span>Loading...</span>
          </>
        ) : (
          state
        )}
      </button>
    </>
  );
};

export default ButtonWithLoader;
