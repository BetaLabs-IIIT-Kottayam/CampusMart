
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Signin from "@/pages/signin";
import Main from "../pages/main";
import Signup from "@/pages/signup";
const Routers = () => {
    return (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/" element={<Main/>} />
            </Routes>
          </BrowserRouter>
        </>
      );
};
export default Routers