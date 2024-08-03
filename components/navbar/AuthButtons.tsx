import React from "react";
import { Button } from "../ui/button";

const AuthButtons = () => {
  return (
    <div className="hidden sm:flex items-center gap-2 transition-all">
      <Button className="text-base text-white bg-[#FE6155] hover:bg-red-500 transition-all">
        Sign Up
      </Button>
      <Button className="text-base text-red-600 bg-red-100 hover:bg-red-200 transition-all">
        Sign In
      </Button>
    </div>
  );
};

export default AuthButtons;
