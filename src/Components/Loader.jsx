import React from "react";

const Loader = ({ color = "white" }) => {
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center">
      <svg
        width="15vw"
        height="40vh"
        viewBox="0 0 24 24"
        className="spinner" // Optionally add a class for styling if needed
      >
        <style>
          {`
          .spinner_Wezc {
            transform-origin: center;
            animation: spinner_Oiah 0.75s step-end infinite;
          }
          
          @keyframes spinner_Oiah {
            8.3% { transform: rotate(30deg); }
            16.6% { transform: rotate(60deg); }
            25% { transform: rotate(90deg); }
            33.3% { transform: rotate(120deg); }
            41.6% { transform: rotate(150deg); }
            50% { transform: rotate(180deg); }
            58.3% { transform: rotate(210deg); }
            66.6% { transform: rotate(240deg); }
            75% { transform: rotate(270deg); }
            83.3% { transform: rotate(300deg); }
            91.6% { transform: rotate(330deg); }
            100% { transform: rotate(360deg); }
          }
        `}
        </style>
        <g className="spinner_Wezc">
          <circle cx="12" cy="2.5" r="1.5" opacity=".14" fill={color} />
          <circle cx="16.75" cy="3.77" r="1.5" opacity=".29" fill={color} />
          <circle cx="20.23" cy="7.25" r="1.5" opacity=".43" fill={color} />
          <circle cx="21.5" cy="12" r="1.5" opacity=".57" fill={color} />
          <circle cx="20.23" cy="16.75" r="1.5" opacity=".71" fill={color} />
          <circle cx="16.75" cy="20.23" r="1.5" opacity=".86" fill={color} />
          <circle cx="12" cy="21.5" r="1.5" fill={color} />
        </g>
      </svg>
    </div>
  );
};

export default Loader;
