import React from "react";

const AuthButtons = () => {
  return (
    <button className="group relative px-2 py-1 sm:px-4 sm:py-1.5 flex transform items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md border text-white bg-indigo-500 font-medium transition-all duration-300 active:scale-90">
      <span className="relative z-10 flex items-center gap-2">Sign In</span>

      <div className="ease-&lsqb;cubic-bezier(0.19,1,0.22,1)&rsqb; absolute -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-white opacity-20 transition-all duration-500 group-hover:left-[120%]" />
    </button>
  );
};

export default AuthButtons;
