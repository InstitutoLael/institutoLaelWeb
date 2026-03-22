import React from "react";
import { Routes, Route } from "react-router-dom";
import ComingSoon from "./pages/ComingSoon.jsx";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* /los-olivos is served as a static file from public/ by Netlify — no React route needed */}
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </>
  );
}