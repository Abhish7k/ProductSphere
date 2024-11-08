import React from "react";
import { Button } from "../ui/button";

const AuthButtons = () => {
  return (
    <div className="flex items-center gap-2 transition-all">
      <Button
        className="px-3 sm:px-4 text-sm sm:text-base 
      text-white bg-indigo-500 hover:bg-indigo-600 
        transition-all duration-300"
      >
        Sign Up
      </Button>

      <Button
        variant="outline"
        className="px-3 sm:px-4 text-sm sm:text-base 
        transition-all duration-300"
      >
        Sign In
      </Button>
    </div>
  );
};

export default AuthButtons;
