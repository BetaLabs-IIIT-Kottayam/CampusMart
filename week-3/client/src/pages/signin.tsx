import Auth from "@/components/Auth/Auth";
import React from "react";
const SignIn = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full min-h-[600px] lg:min-h-[700px] flex items-center justify-center">
        <Auth type="signin" />
      </div>
    </div>
  );
};

export default SignIn;